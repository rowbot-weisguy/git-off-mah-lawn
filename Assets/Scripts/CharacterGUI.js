#pragma strict

var health : float;
var maxhp : float;
var healthBarWidth : int;
var myHealthBarBackground : GameObject;
var myHealthBackground : GameObject;
var myHealthBar : GameObject;
var myHealth : GameObject;


function Start () {
	healthBarWidth = 20;
	
		
		myHealth = Instantiate(myHealthBar, transform.position, transform.rotation);
		myHealthBackground = Instantiate(myHealthBarBackground, transform.position, transform.rotation);

}

function Update () {
	myHealth.transform.position = Camera.main.WorldToViewportPoint(transform.position);
	myHealth.transform.position.x -= 0.085f;
	myHealth.transform.position.y -= 0.06f;
	myHealth.transform.localScale = Vector3.zero;
	
	myHealthBackground.transform.position = Camera.main.WorldToViewportPoint(transform.position);
	myHealthBackground.transform.position.x -= 0.085f;
	myHealthBackground.transform.position.y -= 0.06f;
	myHealthBackground.transform.localScale = Vector3.zero;
	
	var healthPercent : float = UncleJeb.currentHealth / UncleJeb.maxHealth;
	
	if (healthPercent < 0) {
	healthPercent = 0;
	} else if (healthPercent > 100) {
	healthPercent = 100;
	}
	
	healthBarWidth = healthPercent * 40;
	
	if (UncleJeb.currentHealth != UncleJeb.maxHealth) {
		myHealthBackground.guiTexture.pixelInset = Rect(10, 10, 40, 8);
		myHealth.guiTexture.pixelInset = Rect(10, 10, healthBarWidth, 8);
	}
}

