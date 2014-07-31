#pragma strict
var style : GUISkin;

function Start () {

}

function Update () {

}

function OnGUI(){
	GUI.skin = style;
	GUI.Label(Rect(20, 20, 1000, 500), "YOU LOSE");
	
	if (GUI.Button(Rect(50, 200, 100, 50), "RETRY")) {
		Application.LoadLevel("Still House");
	}
}
