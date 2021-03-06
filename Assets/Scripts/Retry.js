﻿#pragma strict
var skin : GUISkin;
var buttonImage : Texture2D;
var buttonWidth : float;
var buttonHeight : float;
var moveSpeed : float = 15;
var friction : float = 0.9;

private var buttonPos : Vector3;
private var buttonRect : Rect;
private var downOffset : float;
private var currentSpeed : Vector3;

static var trigger : boolean = true;

function Start () {
	downOffset = 20;
	currentSpeed = new Vector3(0, moveSpeed);
	
	buttonPos = new Vector3(
		Screen.width/2 - buttonWidth/2,
		Screen.height + downOffset
	);
		
	buttonRect = new Rect(
		buttonPos.x,
		buttonPos.y,
		buttonWidth,
		buttonHeight
	);
}

function Update () {
	if(trigger && Mathf.Abs(currentSpeed.y) >= 0.01) {
		buttonPos -= currentSpeed;
		currentSpeed.y *= friction;
		
		buttonRect = new Rect(
			buttonPos.x,
			buttonPos.y,
			buttonWidth,
			buttonHeight
		);
	}
}

function RetryLevel() {
	currentSpeed = new Vector3(0,-moveSpeed);
	yield WaitForSeconds(0.5);
	Application.LoadLevel(Application.loadedLevel);
}

function OnGUI(){
	GUI.skin = skin;
	GUI.Label(Rect(20, 20, 1000, 500), "YOU LOSE");
	
	if (GUI.Button(buttonRect, buttonImage)) {
		RetryLevel();
	}
}
