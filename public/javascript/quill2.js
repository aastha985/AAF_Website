var organisation = new Quill('#organisation', {
modules: {
	toolbar:false
},
    theme: 'snow'
});
var detail = new Quill('#detail', {
modules: {
	toolbar: [
		['bold', 'italic','underline','strike'],
		['link', 'blockquote'],
		[{ 'script': 'sub'}, { 'script': 'super' }],
		[{ list: 'ordered' }, { list: 'bullet' }]   
    ]
		
},
    theme: 'snow'
});
var eligibility = new Quill('#eligibility', {
modules: {
	toolbar: false
},
    theme: 'snow'
});
var dates = new Quill('#dates', {
modules: {
	toolbar:false  	
},
    theme: 'snow'
});
var process = new Quill('#process', {
modules: {
	toolbar: [
		['link'], 
    ]
		
},
    theme: 'snow'
});
var prize = new Quill('#prize', {
modules: {
	toolbar: false
},
    theme: 'snow'
});
var contact = new Quill('#contact', {
modules: {
	toolbar: [
		['link']
    ]
		
},
    theme: 'snow'
});
var other = new Quill('#other', {
modules: {
	toolbar: [
		['link']
    ]
},
    theme: 'snow'
});

var form = document.querySelector('form');
form.onsubmit = function(){
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