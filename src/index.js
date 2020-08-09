import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

// init doc
const ydoc = new Y.Doc()
window.ydoc=ydoc

// Sync clients with the y-websocket provider
const websocketProvider = new WebsocketProvider(
  'ws://127.0.0.1:8123', 'editor', ydoc
)

// get object from doc to edit it
const yeditor = ydoc.getText('editor')
window.yeditor=yeditor

// when changes of object
yeditor.observe(event => {
  // print updates when the data changes
  console.log(event)
  window.yevent=event
  document.querySelector('#editor').innerText=yeditor.toString()	
})

// when changes of doc
ydoc.on('update',update=>{
	console.log(update)
	window.yupdate=update
	document.querySelector('#meta').innerText=JSON.stringify(
		ydoc.toJSON())
})

// change it
yeditor.insert(0, 'h')
yeditor.insert(1, 'i')
window.clearyeditor = function () {
	console.log(ydoc.toJSON())
	yeditor.delete(0, ydoc.toJSON()['editor'].length)
}
clearyeditor()