let organisation = new Quill('#organisation', {
modules: {
	toolbar:false
},
    theme: 'snow'
});

let detail = new Quill('#detail', {
modules: {
	toolbar: [
		['bold', 'italic','underline','strike'],
		['link', 'blockquote'],
		[{ 'script': 'sub'}, { 'script': 'super' }] 
    ]
		
},
    theme: 'snow'
});

let eligibility = new Quill('#eligibility', {
modules: {
	toolbar: false
},
    theme: 'snow'
});

let dates = new Quill('#dates', {
modules: {
	toolbar:false  	
},
    theme: 'snow'
});

let process = new Quill('#process', {
modules: {
	toolbar: [
		['link'], 
    ]
		
},
    theme: 'snow'
});

let prize = new Quill('#prize', {
modules: {
	toolbar: false
},
    theme: 'snow'
});

let contact = new Quill('#contact', {
modules: {
	toolbar: [
		['link']
    ]
		
},
    theme: 'snow'
});

let other = new Quill('#other', {
modules: {
	toolbar: [
		['link']
    ]
},
    theme: 'snow'
});

let form = document.querySelector('form');
form.onsubmit = () => {
	console.log(organisation.root.innerHTML);
	document.querySelector('#o1').value=organisation.root.innerHTML;
	document.querySelector('#o2').value=detail.root.innerHTML;
	document.querySelector('#o3').value=eligibility.root.innerHTML;
	document.querySelector('#o4').value=dates.root.innerHTML;
	document.querySelector('#o5').value=process.root.innerHTML;
	document.querySelector('#o6').value=prize.root.innerHTML;
	document.querySelector('#o7').value=contact.root.innerHTML;
	document.querySelector('#o8').value=other.root.innerHTML;
}