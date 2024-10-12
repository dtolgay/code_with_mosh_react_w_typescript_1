import { MouseEventHandler } from 'react'
import { IoIosHeartHalf } from "react-icons/io";

interface Props {
    onClick: MouseEventHandler;
}

const Like = ({ onClick }: Props) => {
    return (
        <IoIosHeartHalf color='red' onClick={onClick} size={60}></IoIosHeartHalf>
    )
}

export default Like
