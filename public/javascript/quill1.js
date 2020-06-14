var quill = new Quill('#content', {
modules: {
    toolbar: [
		[{size: [ 'small', false, 'large', 'huge' ]}],
		['bold', 'italic','underline','strike'],
		['link', 'blockquote'],
		[{ 'script': 'sub'}, { 'script': 'super' }] 
    ]
},
placeholder: 'Content goes here...',
    theme: 'snow'
});
var form = document.querySelector('form');
form.onsubmit = function(){
	document.querySelector('input[name=content]').value=quill.root.innerHTML;
	// console.log(document.querySelector('input[name=content]').value);
}