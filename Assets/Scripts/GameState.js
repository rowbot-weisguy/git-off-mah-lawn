#pragma strict
static var gameState : int;
// opening = 0;
// raccoon wave(game) = 1;
// raccoon wave (win) = 2;
// raccoon wave (lose) = 3;

var animationSwitch1 : boolean = false;
var jebAnimation: GameObject;

var animationSwitch2 : boolean = false;
var backgroundAnimation: GameObject;

static var winingGUI : boolean = false; 
static var turned : boolean = false; 

function Start () {
	winingGUI = false;
	turned = false;
}

function Update () {
	checkLosing();
	checkWinning();
	
	if (turned == true) {
		animationSwitch2 = true;
		backgroundAnimation.animation.Play();

	}
}

function checkLosing() {
	if (gameState == 3) {
	Application.LoadLevel("Still House Losing");
	}
}

function checkWinning() {
	if (gameState == 2 && !animationSwitch1) {
	winingGUI = true;
	}
}

function OnGUI(){
		if (winingGUI == true && turned == false) {
		if (GUI.Button(Rect(40, 200, 100, 50), "NEXT WAVE")) {
		jebAnimation.animation.Play();
		animationSwitch1 = true;
		winingGUI = false;
		turned = true;
		animationSwitch1 = false;
		print("turn");
		}
	}
		//if (GUI.Button(Rect(0, 220, 60, 25), "<< HOUSE")) {
		//}
		//if (GUI.Button(Rect(130, 220, 60, 25), "BARNYARD >>")) {
		//}

}
