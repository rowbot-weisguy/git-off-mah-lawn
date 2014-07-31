#pragma strict

var panels : GameObject[];
private var panelMaxHeights : float[];

private var currentPanel : int;

private var tapRate : float = 1;
private var nextTap : float;

function Start () {
	currentPanel = 0;
	panelMaxHeights = [0.8, 0.5, 0.2];
}

function Update () {
	if (Input.GetButton("Fire1") && Time.time > nextTap) {
		MovePanel();
	}
}

function MovePanel () {
	nextTap = Time.time + tapRate;
	
	panels[currentPanel].transform.position.y = panelMaxHeights[currentPanel] - 0.3;
	
	while(panels[currentPanel].transform.position.y < panelMaxHeights[currentPanel]) {
		panels[currentPanel].transform.position.y += 0.01;
		yield WaitForSeconds(0.01);
	}
	
	if (currentPanel < 2) {
		currentPanel++;
	}
}
