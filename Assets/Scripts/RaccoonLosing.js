#pragma strict
var skin : GUISkin;
var buttonImage : Texture2D;
var buttonWidth : float;
var buttonHeight : float;
var loadLevel : String;

private var buttonPos : Vector3;
private var buttonRect : Rect;
private var downOffset : float;
private var speed : Vector3;
var trigger : boolean;

function Start () {
	downOffset = 80;
	speed = new Vector3(0, 10);
	
	buttonPos = new Vector3(
		Screen.width/2 - buttonWidth/2,
		Screen.height - buttonHeight + downOffset
	);
		
	buttonRect = new Rect(
		buttonPos.x,
		buttonPos.y,
		buttonWidth,
		buttonHeight
	);
}

function Update () {
	if(trigger && Mathf.Abs(speed.y) >= 0.01) {
		buttonPos -= speed;
		speed.y *= 0.90;
		
		buttonRect = new Rect(
			buttonPos.x,
			buttonPos.y,
			buttonWidth,
			buttonHeight
		);
	}
}

function OnGUI(){
	GUI.skin = skin;
	GUI.Label(Rect(20, 20, 1000, 500), "YOU LOSE");
	
	if (GUI.Button(buttonRect, buttonImage)) {
		speed = new Vector3(0,-10);
//		Application.LoadLevel(loadLevel);
	}
}
