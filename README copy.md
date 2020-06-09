> > 本文中以 React 为例，但其中的观点及方法论，对 Vue、Angular 等同样适用。
> 
> React 于 2013 开源至今，已经过去了五年。这五年里，前端界从一开始对 HTML in JS(JSX) 等新概念的抗拒，到接受，并且在项目中大量使用。现在，React 已经改变了 View 层的开发方式。
> 
> 可惜，对于不少人而言，使用 React 也只是改变了他们的开发方式而已。React 所提供的，以组件的方式拆分 View 层代码，并通过组件组合的方式搭建页面，这一基本能力并没有被充分发挥。从我过去三年接触过的 React 项目来看，大多数的开发者(全栈 & 专业前端)，只是把组件当做拆分代码的方式，很少会去思考组件该如何设计。结果就是，在项目里随处都能看到组件与 owner 的逻辑、样式强耦合。
> 
> 在使用了 React 的前提下，项目里却还是一大堆没有正确封装且相互之间高度耦合的组件，相当讽刺(毕竟 React 在 README.md 里面可是强调了 Component-Based)，却在意料之中。因为，**React 只是降低了组件实现的难度，并没有降低组件设计的难度**。
> 
> 为了提高项目的质量，我们需要提高项目中 React 组件的设计质量。如果项目只有一个开发者，事情相对容易，只需要不断地提高个人的组件设计能力，并保持相关意识即可。但对由多人协作开发的项目而言，还需要有相应的开发流程保证，才能全面的提高整个项目的质量，如 ESLint 之于代码风格。
> 
> 但在介绍相应的方法论之前，得先讨论一个更加基本的问题。
> 
> ## 为什么需要设计良好的组件
> 对于业务线的开发者而言，在组件设计上花费较多的时间，似乎不是一件值得的事情。毕竟业务系统中的组件，往往只有一个使用场景，所以即使组件与其使用场景强耦合，也不是什么罪过。
> 
> 对一次性项目而言，如活动页，这个论点是对的。但对于需要长期维护的项目而言，一个组件从开发完成，到最终被废弃，它的使用场景其实是不断变化的，因为项目在不断地迭代、重构。例如，C 组件在一开始是在 A 组件下，
> 
> ![image](https://user-images.githubusercontent.com/3580607/42978206-3aae5188-8bfe-11e8-8721-17f3662a5916.png)
> 
> 一段时间后，A 组件被大幅度重构，可以理解为 A 被一个更好的实现 D 替代了，
> 
> ![image](https://user-images.githubusercontent.com/3580607/42978220-4920fd2e-8bfe-11e8-815d-94d7fde1645f.png)
> 
> 如果 A 与 C 强耦合，那么这次重构将会非常辛苦，C 也需要面临本可以避免的重构。可见，**设计良好的组件，能够降低重构的成本。**
> 
> 当然，上面提到的优点是建立在一个组件会被长期使用，随着项目不断迭代的前提下。但前端界面是一个非常不稳定的存在，一个组件被开发出来用不了多久可能就被废弃了，这还有认真设计的必要么？
> 
> 即使是会被废弃的组件，仍然需要有良好的设计。同样是上面的例子，A 组件被替换为 D 组件后，root 中与 A 相关的代码必然需要调整。如果 root 与 A 强耦合，那么 root 就需要较大的改动，而如果 A 是封装良好的组件，那么 root 中只需要移除 A 相关的 state 与 handler 即可。可见，**设计良好的组件，能相对容易的移除、被其他组件替换或替换其他组件**。
> 
> 以上。
> 
> 以下。
> 
> ## 在一个隔离的环境中开发组件
> 与其在开发组件时，时刻堤防着不能与其他组件耦合，还不如直接在一个隔离的环境中开发组件，其实这也是通用组件的开发方式。
> 
> 为了方便读者理解与实践，接下来会用 [Storaybook](https://storybook.js.org/) + [DvaJS](https://dvajs.com/) 展示该方法论。必需强调的是，工具和框架是可以自由选择的。
> 
> ### 接入 Storybook
> 1. `npm install dva-cli -g` 安装 dva-cli，然后运行 `dva new demo` 生成项目目录。
> 2. `npm i -g @storybook/cli` 安装 storybook，然后在 1 创建的项目中运行 `getstorybook`。
> 3. 更新 package.json 中的脚本
>    ```json
>    {
>      "scripts": {
>        "storybook": "start-storybook -p 9001 -c .storybook"
>      }
>    }
>    ```
> 4. 更新 .storybook/config.js 为以下内容
>    ```js-jsx
>    import { configure } from '@storybook/react';
>    
>    function loadStories() {
>      require('../src/components/stories/Example.js');
>    }
>    
>    configure(loadStories, module);
>    ```
> 5. 创建文件 src/components/stories/Example.js 并写入以下内容
>    ```js-jsx
>    import React from 'react';
>    import { storiesOf } from '@storybook/react';
>    import Example from '../Example';
>    
>    storiesOf('Example', module)
>      .add('normal', () => (
>        <Example />
>      ));
>    ```
> 
> 然后就可以通过 `npm start` 和 `npm run storybook` 分别运行项目和 Storybook。
> 
> ### 开发流程
> 引入 Storybook 后，在本地开发时，需要同时运行项目与 Storybook。然后组件的开发、测试工作都先在 Storybook 中完成，再把组件接入项目系统中联调。流程如下：
> 
> ![image](https://user-images.githubusercontent.com/3580607/42978235-66b1f99c-8bfe-11e8-978b-271256392395.png)
> 
> 在一个隔离的环境中开发组件，自然就能保证组件不与上层代码耦合。
> 
> 除了上文提到的优点，引入Storybook 还带来额外的好处：
> 
> 1. 组件 debug 会变得简单。
>    当一个组件碰到问题时，先尝试在 Storybook 及业务系统中分别重现问题。如果 Storybook 中无法重现，在业务系统中却能重现时，那么问题大概率是在组件的使用方式上。以此类推。
> 2. 使用 Storybook 开发组件时编写的 stories 也能成为组件的使用示例，一定程度上缓解了业务代码缺少文档的问题。

