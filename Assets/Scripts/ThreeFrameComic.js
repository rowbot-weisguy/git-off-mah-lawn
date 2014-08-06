#pragma strict

var panels : GameObject[];
private var panelMaxHeights : float[];

private var currentPanel : int;

private var tapRate : float = 0.5;
private var nextTap : float;
private var speed : Vector3;

function Start () {
	currentPanel = 0;
	panelMaxHeights = [0.7, 0.5, 0.3];
}

function Update () {
	if (Input.GetButton("Fire1") && Time.time > nextTap) {
		if (currentPanel < 3) {
			MovePanel();
		} else if (currentPanel >= 3) {
			Debug.Log('Change scene');
		}
	}
}

function MovePanel () {
	nextTap = Time.time + tapRate;
	
	panels[currentPanel].transform.position.y = panelMaxHeights[currentPanel] - 0.3;
	speed = new Vector3(0, 0.03);
	
	while(speed.y > 0.001) {
		panels[currentPanel].transform.position += speed;
		speed.y *= 0.90;
		yield WaitForSeconds(0.01);
	}

	currentPanel++;
}
