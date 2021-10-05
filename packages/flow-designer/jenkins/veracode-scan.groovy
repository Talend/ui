#!/usr/bin/groovy
import groovy.transform.Field

/**
 * Security scan pipeline for the react-flow-designer project
 */

/**
 * Global variables
 */
@Field def dockerArtifactoryDomain = "artifactory.datapwn.com"
@Field def dockerRegistryDomain = "registry.datapwn.com"

def slackChannel = 'pipeline-designer-notifications'
def decodedJobName = env.JOB_NAME.replaceAll("%2F", "/")
def projectName = 'react-flow-designer'
def pipelineName = 'security-scan'


/**
 * Pod configuration
 */
def podLabel = "${projectName}-${pipelineName}-${UUID.randomUUID().toString()}".take(53)
def podConfiguration = """
apiVersion: v1
kind: Pod
spec:
  imagePullSecrets:
    - talend-registry
  containers:
    - name: nodejs
      image: artifactory.datapwn.com/tlnd-docker-prod/talend/common/tsbi/node-builder:2.5.4-20210112094055
      resources:
        requests:
          memory: "2G"
          cpu: "2"
        limits:
          memory: "8G"
          cpu: "4"
      command:
      - cat
      tty: true
      volumeMounts:
      - name: npm-cache
        mountPath: /root/.npm
      - name: docker
        mountPath: /var/run/docker.sock

  volumes:
    - name: docker
      hostPath:
        path: /var/run/docker.sock
    - name: npm-cache
      persistentVolumeClaim:
        claimName: efs-jenkins-dp-pipeline-designer-npm
"""

/**
 * Credentials
 */

def artifactoryCredentials = usernamePassword(
        credentialsId: 'artifactory-datapwn-credentials',
        passwordVariable: 'dockerArtifactoryPassword',
        usernameVariable: 'dockerArtifactoryUsername'
)

def nexusCredentials = usernamePassword(
        credentialsId: 'nexus-credentials',
        passwordVariable: 'nexusPassword',
        usernameVariable: 'nexusUsername'
)

def npmCredentials = string(
        credentialsId: 'npm-credentials',
        variable: 'npmAuthToken',
)

def dockerCredentials = usernamePassword(
        credentialsId: 'docker-registry-credentials',
        passwordVariable: 'dockerRegistryPassword',
        usernameVariable: 'dockerRegistryUsername'
)

/**
 * Options
 */
def discarderConfiguration = logRotator(numToKeepStr: '30', artifactNumToKeepStr: '10')
def timeoutConfiguration = [time: 45, unit: 'MINUTES']

pipeline {
    agent {
        kubernetes {
            label podLabel
            yaml podConfiguration
        }
    }

    triggers {
        cron('0 11 * * 0')
    }

    options {
        buildDiscarder(discarderConfiguration)
        timeout(timeoutConfiguration)
        skipStagesAfterUnstable()
    }

    environment {
        branch = "${env.BRANCH_NAME}"
        commit = "${env.GIT_COMMIT}"
        timestamp = sh(returnStdout: true, script: "date +%Y%m%d_%H%M%S").trim()
    }

    stages {
        stage('Prepare Node JS Container') {
            steps {
                container('nodejs') {
                    withCredentials([npmCredentials, dockerCredentials, artifactoryCredentials]) {
                        script {
                            sh """#! /bin/bash
                    curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo
                    rpm --import https://dl.yarnpkg.com/rpm/pubkey.gpg
                    yum --assumeyes install yarn
                    echo -e "email=devops@talend.com\n//registry.npmjs.org/:_authToken=${npmAuthToken}" > /root/.npmrc
                    docker login ${dockerRegistryDomain}    -u ${dockerRegistryUsername}    --password-stdin <<< ${dockerRegistryPassword}
                    docker login ${dockerArtifactoryDomain} -u ${dockerArtifactoryUsername} --password-stdin <<< ${dockerArtifactoryPassword}
                  """
                        }
                    }
                }
            }
        }

        stage('Source clear scan') {
            steps {
                container('nodejs') {
                    withCredentials([string(credentialsId: 'veracode-token', variable: 'SRCCLR_API_TOKEN')]) {
                        sh '''#!/bin/bash
              curl -sSL https://download.sourceclear.com/ci.sh | SRCCLR_API_TOKEN=${SRCCLR_API_TOKEN} DEBUG=0 sh -s -- scan --recursive --loud;
            '''
                    }
                }
            }
        }
    }

    post {
        success {
            slackSend (color: 'good', channel: "${slackChannel}", message: "${decodedJobName} - #${env.BUILD_NUMBER} Success after ${currentBuild.durationString} (<${env.BUILD_URL}|Open>)")
        }

        unstable {
            slackSend (color: 'warning', channel: "${slackChannel}", message: "${decodedJobName} - #${env.BUILD_NUMBER} Unstable after ${currentBuild.durationString} (<${env.BUILD_URL}|Open>)")
        }

        failure {
            slackSend (color: 'danger', channel: "${slackChannel}", message: "${decodedJobName} - #${env.BUILD_NUMBER} Failure after ${currentBuild.durationString} (<${env.BUILD_URL}|Open>)")
        }

        aborted {
            slackSend (color: 'warning', channel: "${slackChannel}", message: "${decodedJobName} - #${env.BUILD_NUMBER} Aborted after ${currentBuild.durationString} (<${env.BUILD_URL}|Open>)")
        }
    }
}
