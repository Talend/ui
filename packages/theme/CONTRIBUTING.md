# Contributing to the project

Here are the guidelines we'd like you to follow:

- [Commit Message Guidelines](#commit)


## <a name="commit"></a> Git Commit Guidelines

We have very precise rules over how our git commit messages can be formatted.  This leads to **more
readable messages** that are easy to follow when looking through the **project history**.

### Commit Message Format
Each commit message consists of a **header**, a **body** and a **footer**.  The header has a special
format that includes a **type**, a **scope** and a **subject**:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The **header** is mandatory and the **scope** of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

#### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit.
In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

#### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

#### Scope
The scope could be anything specifying place of the commit change. Most of the time it shoulb be Jira ticket reference followed by a usefull context.

For example `TFD-66/webapp`, `TFD-67/cli`, `svc-datastore`, etc...

#### Subject
The subject contains succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize first letter
* no dot (.) at the end

#### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

#### Footer
The footer should contain

* any information about **Breaking Changes**
* [Smart commits](https://confluence.atlassian.com/fisheye/using-smart-commits-298976812.html) (aka JIRA commands)

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

#### Examples


```
doc(TFD-38/webapp): analyse more flowchart libraries

* Add JointJS, JIT, JSNetworkX
* Add references on non OSS libs
* Remove canvg

#time 1h
#comments JointJS seems great
```

```
feat(TFD-66/cli): implement Swagger from FlowRunnerController

#time 3h
```

```
fix(TFD-60): review the DAO architecture to inject the ReactiveMongoAPI
```

```
chore(TFD-60/poc/runtimedsl): adding constraint on tSortRow
```
