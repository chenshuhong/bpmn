## 目录文件说明

- src下非umd目录下文件：

  - index.html html模板文件，提供canvas根节点和右侧面板根节点

  - index.less 样式文件，主要是以下样式，右侧面板宽度，文字大小，某些属性框隐藏，自定义属性框的样式

    ```
    #properties-panel-parent {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      width: 400px;
      z-index: 10;
      border-left: 1px solid #ccc;
      overflow: auto;
      font-size: 12px;
      div[data-entry="id"],div[data-group="candidateStarterConfiguration"],
      div[data-group="tasklist"],div[data-group="externalTaskConfiguration"],
      div[data-group="jobConfiguration"],div[data-group="historyConfiguration"],
      div[data-group="async"],div[data-entry="dueDate"],
      div[data-entry="followUpDate"],div[data-entry="priority"],
      div[data-entry="versionTag"],div[data-entry="process-is-executable"]{
        display: none;
      }
      .bpp-properties-radio-container{
        margin-top: 8px;
        .bpp-properties-radio-explain{
          display: inline-block;
          position: relative;
          i{
            font-style: normal;
            border: 1px solid #ccc;
            border-radius: 50%;
            display: inline-block;
            cursor: pointer;
            width: 17px;
            height: 17px;
            text-align: center;
            line-height: 16px;
            color: #999;
            transform: scale(0.8, 0.8);
          }
          span{
            display: none;
            position: absolute;
            top: -58px;
            right: -276px;
            background-color: #fff;
            padding: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 275px;
          }
          &:hover{
            span{
              display:inline-block;
            }
          }
        }
      }
    }
    
    .bpmn-icon-data-object,.bpmn-icon-subprocess-expanded,.bpmn-icon-data-store,.bpmn-icon-participant,.bpmn-icon-intermediate-event-none{
      display: none!important;
    }
    ```

  - index.js 入口文件，其中

    生成bpmn modler代码

    ```
    let bpmnModeler = new BpmnModeler({
      container: '#bpmn-canvas',
      propertiesPanel: {
        parent: '#properties-panel-parent',
      },
      additionalModules: [
        propertiesPanelModule,
       customPropertiesProviderModule,
       customTranslateModule
      ],
      moddleExtensions: {
       camunda: camundaModdleDescriptor,
      }
    });
    bpmnModeler.createDiagram()
    ```

    更新属性值方法

    ```
    function updateProperties(id,propertiy,defalutValue=''){
      let value=prompt("请输入值",defalutValue);
      if (value){
        bpmnModeler.invoke(function(elementRegistry, modeling) {
          var serviceTaskShape = elementRegistry.get(id);
          modeling.updateProperties(serviceTaskShape, {
            [propertiy]: value
          });
        });
      }
    }
    ```

  - customTranslate，translationsChina 中文翻译文件，如发现有未翻译的，请在源码里给对应英文补上translate（‘要翻译的英文’）

- umd目录下文件，通过index.js入口文件，能够打包成js供直接引入使用，绕开bpmn需要webpack2+版本的限制

## 使用方式

1. npm run start 可运行非umd下的文件，所有的改动在这里试验，试验完成后把对应改动迁移到umd目录下，然后运行 npm run buildumd，可在dist目录生成一个umd文件，在对应项目引入即可使用
