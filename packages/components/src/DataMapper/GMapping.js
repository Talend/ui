import React, { Component } from 'react';

export default class GMapping extends Component {

  componentDidMount() {
    this.initCanvasSize();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  initCanvasSize() {
    const canvas = this.refs.canvas
    const canvasDiv = this.refs.canvasDiv
    canvas.width = canvasDiv.clientWidth
    canvas.height = canvasDiv.clientHeight
  }

  updateCanvas() {
    this.clearCanvas()
    const context = this.refs.canvas.getContext('2d');
    const connection = this.props.getConnection()
    if (connection != null && connection.sourceYPos != null && connection.targetYPos != null) {
      this.drawConnection(connection, context)
    }
  }

  clearCanvas() {
    const context = this.refs.canvas.getContext('2d');
    context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height)
  }

  drawConnection(connection, context) {
    const radius = 5;
    const x1 = radius
    const y1 = connection.sourceYPos
    const x2 = this.refs.canvas.width - radius
    const y2 = connection.targetYPos
    this.drawPoint(x1, y1, radius, context)
    this.drawLine(x1, y1, x2, y2, 3, context)
    this.drawPoint(x2, y2, radius, context)
  }

  drawLine(x1, y1, x2, y2, width, context) {
    context.beginPath()
    context.lineWidth = width
    context.lineJoin = 'round'
    context.moveTo(x1, y1)
    context.lineTo(x2, y2)
    context.stroke()
    context.closePath()
  }

  drawPoint(x, y, radius, context) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI*2);
    context.fill();
    context.closePath();
  }

  render() {
    return (
      <div id='mapping' className='mapper-element'>
        <div className='mapping-tools'>
          <button id='clear-connection' className='remove-action' onClick={this.props.clearConnection}/>
          <button id='clear-mapping' className='remove-all-action' onClick={this.props.clearMapping}/>
        </div>
        <div ref='canvasDiv' className='mapping-content'>
          <canvas ref='canvas' id='mapping-canvas' />
        </div>
      </div>
    )
  }
}
