#pragma strict
public var removeTimer : float;

function Start () {
}

function Update () {
	Remove();
}

function Remove () {
	removeTimer --;
	if (removeTimer == 0) {
		Destroy(gameObject);
		removeTimer = 10;
	}
}