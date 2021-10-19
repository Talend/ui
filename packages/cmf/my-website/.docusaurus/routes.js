
import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/cmf/',
    component: ComponentCreator('/cmf/','e3b'),
    exact: true
  },
  {
    path: '/cmf/__docusaurus/debug',
    component: ComponentCreator('/cmf/__docusaurus/debug','c87'),
    exact: true
  },
  {
    path: '/cmf/__docusaurus/debug/config',
    component: ComponentCreator('/cmf/__docusaurus/debug/config','e10'),
    exact: true
  },
  {
    path: '/cmf/__docusaurus/debug/content',
    component: ComponentCreator('/cmf/__docusaurus/debug/content','4a4'),
    exact: true
  },
  {
    path: '/cmf/__docusaurus/debug/globalData',
    component: ComponentCreator('/cmf/__docusaurus/debug/globalData','b20'),
    exact: true
  },
  {
    path: '/cmf/__docusaurus/debug/metadata',
    component: ComponentCreator('/cmf/__docusaurus/debug/metadata','1b1'),
    exact: true
  },
  {
    path: '/cmf/__docusaurus/debug/registry',
    component: ComponentCreator('/cmf/__docusaurus/debug/registry','f54'),
    exact: true
  },
  {
    path: '/cmf/__docusaurus/debug/routes',
    component: ComponentCreator('/cmf/__docusaurus/debug/routes','adb'),
    exact: true
  },
  {
    path: '/cmf/blog',
    component: ComponentCreator('/cmf/blog','918'),
    exact: true
  },
  {
    path: '/cmf/blog/2018/12/18/cmf-2',
    component: ComponentCreator('/cmf/blog/2018/12/18/cmf-2','9d5'),
    exact: true
  },
  {
    path: '/cmf/blog/archive',
    component: ComponentCreator('/cmf/blog/archive','e1d'),
    exact: true
  },
  {
    path: '/cmf/blog/first-blog-post',
    component: ComponentCreator('/cmf/blog/first-blog-post','0f4'),
    exact: true
  },
  {
    path: '/cmf/blog/long-blog-post',
    component: ComponentCreator('/cmf/blog/long-blog-post','f09'),
    exact: true
  },
  {
    path: '/cmf/blog/mdx-blog-post',
    component: ComponentCreator('/cmf/blog/mdx-blog-post','46c'),
    exact: true
  },
  {
    path: '/cmf/blog/tags',
    component: ComponentCreator('/cmf/blog/tags','99d'),
    exact: true
  },
  {
    path: '/cmf/blog/tags/docusaurus',
    component: ComponentCreator('/cmf/blog/tags/docusaurus','524'),
    exact: true
  },
  {
    path: '/cmf/blog/tags/facebook',
    component: ComponentCreator('/cmf/blog/tags/facebook','00d'),
    exact: true
  },
  {
    path: '/cmf/blog/tags/hello',
    component: ComponentCreator('/cmf/blog/tags/hello','7e7'),
    exact: true
  },
  {
    path: '/cmf/blog/tags/hola',
    component: ComponentCreator('/cmf/blog/tags/hola','965'),
    exact: true
  },
  {
    path: '/cmf/blog/welcome',
    component: ComponentCreator('/cmf/blog/welcome','2e8'),
    exact: true
  },
  {
    path: '/cmf/docs/tags',
    component: ComponentCreator('/cmf/docs/tags','065'),
    exact: true
  },
  {
    path: '/cmf/markdown-page',
    component: ComponentCreator('/cmf/markdown-page','ec0'),
    exact: true
  },
  {
    path: '/cmf/docs',
    component: ComponentCreator('/cmf/docs','929'),
    routes: [
      {
        path: '/cmf/docs/intro',
        component: ComponentCreator('/cmf/docs/intro','7a3'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/cmf/docs/tutorial-basics/congratulations',
        component: ComponentCreator('/cmf/docs/tutorial-basics/congratulations','26f'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/cmf/docs/tutorial-basics/create-a-blog-post',
        component: ComponentCreator('/cmf/docs/tutorial-basics/create-a-blog-post','d21'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/cmf/docs/tutorial-basics/create-a-document',
        component: ComponentCreator('/cmf/docs/tutorial-basics/create-a-document','c8f'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/cmf/docs/tutorial-basics/create-a-page',
        component: ComponentCreator('/cmf/docs/tutorial-basics/create-a-page','12d'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/cmf/docs/tutorial-basics/deploy-your-site',
        component: ComponentCreator('/cmf/docs/tutorial-basics/deploy-your-site','4ad'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/cmf/docs/tutorial-basics/markdown-features',
        component: ComponentCreator('/cmf/docs/tutorial-basics/markdown-features','c2f'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/cmf/docs/tutorial-extras/manage-docs-versions',
        component: ComponentCreator('/cmf/docs/tutorial-extras/manage-docs-versions','180'),
        exact: true,
        'sidebar': "tutorialSidebar"
      },
      {
        path: '/cmf/docs/tutorial-extras/translate-your-site',
        component: ComponentCreator('/cmf/docs/tutorial-extras/translate-your-site','641'),
        exact: true,
        'sidebar': "tutorialSidebar"
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*')
  }
];
