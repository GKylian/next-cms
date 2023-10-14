'use client'

import { DndContext, MeasuringStrategy, PointerSensor, pointerWithin, useSensor, useSensors } from "@dnd-kit/core";
import BlocksEditor from "./components/BlocksEditor"
import styles from './pageEditor.module.scss'
import { usePageEditorContext } from "./PageEditorContext";
import LoadingPageEditor from "./components/Loading";
import ErrorPageEditor from "./components/Error";

type Props = {}
function PageEditor({ }: Props) {
    const { editor } = usePageEditorContext();

    const blockSensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }));
    
    if (editor.isLoading) return (
        <LoadingPageEditor />
    )
    if (editor.error) return (
        <ErrorPageEditor />
    )

    return (
        <DndContext sensors={blockSensors} measuring={{droppable: {strategy: MeasuringStrategy.BeforeDragging}}} collisionDetection={pointerWithin}>
            <BlocksEditor />
        </DndContext>
    )
}
export default PageEditor
