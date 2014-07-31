#pragma strict

private var controller: CharacterController;
var defaultBullet : GameObject;
private var speed : float = 700;
static var firing : boolean;
static var fireRate : float = 0.2f;
static var nextFire : float;
public var gun : AudioClip;

function Start () {
	controller = GetComponent(CharacterController);
	firing = false;
}

function Update () {
	if (Input.GetButton("Fire1") && Time.time > nextFire) {
		firing = true;
		Fire();
	} else if (Input.GetKey("space") && Time.time > nextFire) {
		Fire();
	} else {
		firing = false; 
	}
}

function Fire() {
	nextFire = Time.time + fireRate;
	var spawn_defaultBullet = Instantiate(defaultBullet, transform.position, Quaternion.identity);
	spawn_defaultBullet.rigidbody.AddForce(Vector3.up * speed);
	audio.PlayOneShot(gun);
}
