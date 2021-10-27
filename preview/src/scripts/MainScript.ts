import { GameObject, PrimitiveTypes, ScriptComponent } from '@nox-engine/engine';
import { Mathf, Vector3 } from '@nox-engine/mathf';
import CameraScript from './CameraScript';
import ChildrenScript from './ChildrenScript';
import LightScript from './LightScript';
import ParentScript from './ParentScript';

export default class MainScript extends ScriptComponent {
    public start() {
        GameObject.createCamera().addComponent(CameraScript);
        GameObject.createGlobalLight().addComponent(LightScript);

        let parent = GameObject.createPrimitive(PrimitiveTypes.Cube).addComponent(ParentScript).gameObject;
        let children = GameObject.createPrimitive(PrimitiveTypes.Cube).addComponent(ChildrenScript).gameObject;
        let childrenChildren = GameObject.createPrimitive(PrimitiveTypes.Cube).addComponent(ChildrenScript).gameObject

        parent.transform.position.x = 0;
        parent.transform.rotation.axisAngle(new Vector3(1,1,1), Mathf.rad2deg * 30);

        children.transform.position.y = 0;
        children.transform.position.x = 8;

        childrenChildren.transform.scale = new Vector3(0.5, 0.5, 0.5)
        childrenChildren.transform.position.x = 1;
        childrenChildren.transform.position.y = 0;

        parent.addChildren(children);
        children.addChildren(childrenChildren);
    }
}