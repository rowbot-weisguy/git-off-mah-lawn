#pragma strict

private var controller: CharacterController;
var defaultBullet : GameObject;
private var speed : float = 700;
static var fireTimer : float;
static var firing : boolean;
public var gun : AudioClip;

function Start () {
	controller = GetComponent(CharacterController);
	fireTimer = 15;
	firing = false;
}

function Update () {
	Fire();
}

function Fire() {
	if (UncleJeb.inHouse == false) {
	if (Input.GetKey(KeyCode.Space)) {
		fireTimer --;
		if (fireTimer <= 0) {
			firing = true;
			var spawn_defaultBullet = Instantiate(defaultBullet, transform.position, Quaternion.identity);
			spawn_defaultBullet.rigidbody.AddForce(Vector3.up * speed);
			audio.PlayOneShot(gun);
			fireTimer = 15;
		}
	}else if (Input.GetKeyUp(KeyCode.Space)){
		fireTimer = 15;
		firing = false;
	}
	}
}
