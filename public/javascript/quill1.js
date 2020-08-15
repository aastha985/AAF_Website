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

let form = document.querySelector('form');

form.onsubmit = () => {
	document.querySelector('input[name=content]').value=quill.root.innerHTML;
}