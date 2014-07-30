#pragma strict

function Start () {

}

function Update () {

}

function OnTriggerEnter (col: Collider) {
	
	if (gameObject.tag == "Fense") {
		if (col.gameObject.tag == "Enemy Bullet") {
			Destroy(gameObject);
			Destroy(col.gameObject);
			} else if (col.gameObject.tag == "Raccoon") {
				Destroy(gameObject);
				}
		}
}