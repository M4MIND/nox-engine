import { Vector3 } from '@nox-engine/mathf';
import GameObject from '../object/GameObject';
import SceneManager from '../scene/SceneManager';
import Ray from './Ray';

export default class Physics {
    public static raycast(ray: Ray, maxDistance: number = 10, callback: (gm: GameObject) => void) {
        for (let gm of SceneManager.activeScene.getObjects()) {
            let vMin = new Vector3(gm.transform.position.x - 0.5, gm.transform.position.y - 0.5, gm.transform.position.z - 0.5);
            let vMax = new Vector3(gm.transform.position.x + 0.5, gm.transform.position.y + 0.5, gm.transform.position.z + 0.5);

            let xMin = (vMin.x - ray.position.x) / ray.direction.x;
            let xMax = (vMax.x - ray.position.x) / ray.direction.x;
            let yMin = (vMin.y - ray.position.y) / ray.direction.y;
            let yMax = (vMax.y - ray.position.y) / ray.direction.y;
            let zMin = (vMin.z - ray.position.z) / ray.direction.z;
            let zMax = (vMax.z - ray.position.z) / ray.direction.z;

            let min = Math.max(Math.max(Math.min(xMin, xMax), Math.min(yMin, yMax)), Math.min(zMin, zMax));
            let max = Math.min(Math.min(Math.max(xMin, xMax), Math.max(yMin, yMax)), Math.max(zMin, zMax));

            if (isNaN(min) || min === Infinity || isNaN(max) || max === Infinity) {
                continue;
            }

            if (max < 0) {
                continue;
            }

            if (min > max) {
                continue;
            }

            callback(gm);
        }
    }
}