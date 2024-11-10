import React, {  useCallback } from "react"
import ReactDOM from 'react-dom'
import styles from './Modal.module.css'
import Backdrop from "../Backdrop/Backdrop"

const Modal = (props) => {
    // const [showModal, setShowModal] = useState(true)
    const { modalBtn=null, direction, showModal = false, onToggel } = props

    const onShowModalClickHandler = useCallback(() => {
        onToggel(!showModal)
    }, [showModal,onToggel])

    let modalDirectionStyle = styles['modal-top-right']
    switch (direction) {
        case 'top-right':
            modalDirectionStyle = styles['modal-top-right']
            break;
        default:
            modalDirectionStyle = styles['modal-top-right']
    }

    return <div className={`${styles['modal-container']}`}>
        {modalBtn}
        {showModal &&
            <article className={`${styles['modal-section']} ${modalDirectionStyle} ${props.className}`}>
                <p>
                    {props.children}
                </p>
            </article>
        }
        {ReactDOM.createPortal(<Backdrop show={showModal} onClick={onShowModalClickHandler} />, document.getElementById('backdrop'))}
    </div>
}

export default Modal