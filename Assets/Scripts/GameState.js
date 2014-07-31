#pragma strict
static var gameState : int;
// opening = 0;
// raccoon wave(game) = 1;
// raccoon wave (win) = 2;
// raccoon wave (lose) = 3;

function Start () {

}

function Update () {
	checkLosing();
}

function checkLosing() {
	if (gameState == 3) {
	Application.LoadLevel("Raccoon Losing");
	}
}

