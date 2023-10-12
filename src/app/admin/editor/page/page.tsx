'use client'

import { DndContext, MeasuringStrategy, PointerSensor, pointerWithin, useSensor, useSensors } from "@dnd-kit/core";
import BlocksEditor from "./components/BlocksEditor"
import styles from './pageEditor.module.scss'

type Props = {}
function PageEditor({ }: Props) {


    const blockSensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }));

    return (
        <DndContext sensors={blockSensors} measuring={{droppable: {strategy: MeasuringStrategy.BeforeDragging}}} collisionDetection={pointerWithin}>
            <BlocksEditor />
        </DndContext>
    )
}
export default PageEditor
