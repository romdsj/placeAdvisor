function deleteReview(id) {

	var req = new XMLHttpRequest();
	req.open('delete', '/reviews/' + id);
	req.send();
	window.location.href = '/reviews';

}


function editReview(id) {

	var name = document.getElementById("name").value;
	var placeType = document.getElementById("placeType").value;
	var stars = document.getElementById("stars").value;

	var req = new XMLHttpRequest();
	req.open("put", "/" + id);
	req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	req.send(JSON.stringify({name:name, placeType: placeType, stars: stars}));
	
	window.location.href = '/' + id;

}


function searchReview() {

	var val = document.getElementById("val").value;
	var type = document.getElementById("type").value;
	window.location.href = "/reviews/search?"+ type + "="+ val;
	
}