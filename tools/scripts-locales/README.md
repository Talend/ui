# @talend/scripts-locales

This package expose a command line useful to manage locales.

Commands:

- `npx @talend/scripts-locales update-code --ref ./node_modules/@talend/locales-tui-components/locales/en --comp=all ./packages/components/src/` will update default message inside source by using english translations (ref).

```
args[0] => reference -> locales_en.json or the folder with multiple locale json (for ex: settings.json, app.json etc.,)
args[1] => i18n component to find -> can be any of ['i18n', 'trans', 'all']
        -- usage "--comp=i18n" || "--comp=trans"  || "--comp=i18n,trans" || "--comp=all"
args[2] => target -> folder with application source (ex: ./packages)
```

Steps to run the script:

1. Run "eslint --fix" and prettier on the target folder and merge the changes in master.
2. Run `npx @talend/scripts-locales update-code --ref ./locales/en -t ./src` from your new branch.
3. Use "lint-staged" pre-commit or run "eslint --fix" and "prettier --write" on the target folder.
4. Review "Trans" components and all the translated locales in your PR.

## Codeshift for t() functions

This codeshift will search all i18n call expressions and replaces the default values with the provided translation file

Finds all usage of: i18n.t(), props.t(), rest.t(), ownprops.t(), config.t(), t()

This script transform this pattern

```javascript
i18n.t('TASK_HISTORY_DETAIL_STATUS_REQUEST_TO_EXECUTE', {
	defaultValue: 'Run task',
});
```

into

```javascript
i18n.t('TASK_HISTORY_DETAIL_STATUS_REQUEST_TO_EXECUTE', {
	defaultValue: 'Request to run task',
});
```

## Codeshift for <Trans> component

The goal is to find all <Trans> component in the source code. See TmcTutorial.container.js for example.
And to replace the values with the content of portal-app.json

/!\ there are still some indentation issues in the result of the codemod if the content of the trans component is not surrounded with some html tags.

This script transform this pattern

```html
<Trans i18nKey="TUTORIAL_TMC_INTRO" t="{t}">
	<p>
		Develop data integration, big data and real-time analytics Jobs, REST and SOAP Services, and
		Mediation Routes in Talend Studio, and then deploy them in the cloud. Talend Cloud helps
		increase productivity and optimize all types of integration with instant, elastic, and secure
		capacity.
	</p>
	<p>
		Talend Management Console helps govern, manage, deploy, and monitor the execution of all types
		of artifacts.
	</p>
</Trans>
<Trans i18nKey="DOWNLOAD_REMOTE_ENGINE_PIPELINES_TEXT_1" t="{t}">
	<p>Use a {{ remoteEngineName }} to execute pipeline tasks on premises.</p>
	<p>Download the archive and install the {{ remoteEngineName }} on any platform you need:</p>
</Trans>
<Trans t="{t}" i18nKey="DOWNLOAD_INTRO_NO_DOWNLOADS">
	There is nothing to download!
	<br />
	If you think there is something missing, check your subscription options or contact your
	administrator.
</Trans>
```

into

```html
<Trans i18nKey="TUTORIAL_TMC_INTRO" t="{t}">
	<p>
		Develop data integration, big data and real-time analytics Jobs, REST and SOAP services, and
		Mediation Routes in Talend Studio, and then deploy them in the cloud. Talend Cloud helps
		increase productivity and optimize all types of integration with instant, elastic, and secure
		capacity.
	</p>
	<p>
		Talend Management Console helps govern, manage, deploy, and monitor the execution of all types
		of artifacts.
	</p>
</Trans>
<Trans i18nKey="DOWNLOAD_REMOTE_ENGINE_PIPELINES_TEXT_1" t="{t}">
	<p>Use a {{ remoteEngineName }} to execute pipeline tasks on premises.</p>
	<p>Download the archive and install the {{ remoteEngineName }} on any platform you need:</p>
</Trans>
<Trans t="{t}" i18nKey="DOWNLOAD_INTRO_NO_DOWNLOADS">
	There is nothing to download!
	<br />
	If you think there is something missing, check your subscription options or contact your
	administrator.
</Trans>
```
