#pragma strict
static var gameState : int;
// opening = 0;
// raccoon wave(game) = 1;
// raccoon wave (win) = 2;
// raccoon wave (lose) = 3;

 //static var animationSwitch1 : boolean = false;
 //static var jebAnimation: GameObject;

 var animationSwitch2 : boolean = false;
 var backgroundAnimation: GameObject;

 var winingGUI : boolean = false; 
 var animationStart : boolean = false; 
 var readyToRotate : boolean = false;
 var rotationTimer : float = 0;
 
 var animationTimer : int;
 public var banjo : AudioClip;
 public var win : AudioClip;

function Start () {
	winingGUI = false;
	animationTimer = 170;
	animationStart = false;
	gameState = 1;
	audio.PlayOneShot(banjo);

}

function Update () {
	checkLosing();
	checkWinning();
	checkAnimation();
	
	if (animationStart == true) {
		animationTimer --;
	}
	
	if (animationTimer <= 0) {
		animationTimer = 0;
	}
}

function checkLosing() {
	if (gameState == 3) {
	Application.LoadLevel("Still House Losing");
	}
}

function checkWinning() {
	if (gameState == 2 && !animationSwitch2) {
	winingGUI = true;

	}
}

function checkAnimation(){
	if (readyToRotate == true){
		rotationTimer ++;
		if (rotationTimer == 60) {
			backgroundAnimation.animation.Play();
			rotationTimer = 0;
			readyToRotate = false;
		}
	}
}

function OnGUI(){
		if (winingGUI == true) {
		if (GUI.Button(Rect(Screen.width/2 - 50, Screen.height/3 * 2, 100, 50), "NEXT WAVE")) {
			audio.PlayOneShot(win);
			animationSwitch2 = true;
			winingGUI = false;
			animationStart = true;
			UncleJeb.anim.SetTrigger("Rotate");
			readyToRotate = true;

		}
	}
		if (animationTimer <= 0) {
			if (GUI.Button(Rect(0, Screen.height /4 * 3.5, 70, 25), "HOUSE")) {
				animationTimer = 0;
				animationStart = false;
				Application.LoadLevel("House");
				winingGUI = false;
			}
			if (GUI.Button(Rect(Screen.width/4 * 2, Screen.height /4 * 3.5, 100, 25), "BARNYARD")) {
				animationTimer = 0;
				animationStart = false;
				Application.LoadLevel("Green Barnyard");
				winingGUI = false;
			}
		}

}
