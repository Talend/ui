import React, { Component }  from 'react';
import SchemaElement from './SchemaElement/SchemaElement.js'
import DraggableSchemaElement from './SchemaElement/DraggableSchemaElement.js'
import { SchemaType } from '../Constants';
import { reverse } from '../Utils';

function isMapped(element, mapped) {
  return mapped == null ? false : mapped.includes(element)
}

function isSelected(element, selection, type) {
  return selection == null ? false : (selection.type === type && selection.element === element) || (selection.type !== type && selection.connected === element)
}

function renderSchemaElement(type, elem, draggable, mapped, performMapping, selection, onSelect) {
  if (draggable) {
    return (
      <DraggableSchemaElement
        key={elem}
        name={elem}
        schemaType={type}
        mapped={isMapped(elem, mapped)}
        performMapping={performMapping}
        selected={isSelected(elem, selection, type)}
        onSelect={onSelect}
      />
    )
  } else {
    return (
      <SchemaElement
        key={elem}
        name={elem}
        schemaType={type}
        selected={isSelected(elem, selection, type)}
        onSelect={onSelect}
      />
    )
  }
}

export default class Schema extends Component {

  getYPosition(element) {
    const scrollTop = this.contentNode.scrollTop
    const children = this.contentNode.childNodes
    const childranArray = Array.from(children)
    const child = childranArray.find((child) => child.firstChild.innerHTML === element)
    const childOffsetTop = child.offsetTop;
    const parentOffsetTop = this.contentNode.offsetTop;
    const y = childOffsetTop - parentOffsetTop + child.clientHeight / 2 - scrollTop;
    return y
  }

  render() {
    const {type, schema, draggable, mapped, performMapping, selection, onSelect} = this.props
    return (
      <div className={'Schema mapper-element'}>
        <div className='Schema-title'>{type + ' schema'}</div>
        <div
          ref={(content) => { this.contentNode = content }}
          className={reverse('Schema-content', type === SchemaType.INPUT)}
          onScroll={this.props.onScroll}
        >{
          schema.map(elem => (
            renderSchemaElement(type, elem, draggable, mapped, performMapping, selection, onSelect)
          ))
        }
        </div>
      </div>
    )
  }
}
