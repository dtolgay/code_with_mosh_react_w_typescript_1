import { useState } from "react";
import styled from "styled-components";

const List = styled.ul`
    list-style: none;
`

interface ListItemProps {
    active: boolean
}

const ListItem = styled.li<ListItemProps>`
    padding: 10px 0;
    background: ${props => props.active ? "blue" : "none"}
`

interface Props {
    items: string[];
    heading: string;
    onSelectItem: (item: string) => void
}

function ListGroup({ items, heading, onSelectItem }: Props) {

    let [selectedIndex, setSelectedIndex] = useState(0);


    return (
        <>
            <h1>{heading}</h1>
            {items.length === 0 && <p>No Item found</p>}
            <List>
                {items.map((item, index) =>
                    <ListItem
                        // active={index === selectedIndex}
                        active={false}
                        key={item}
                        onClick={() => {
                            setSelectedIndex(index);
                            onSelectItem(item);
                        }}>
                        {item}
                    </ListItem>)}
            </List >
        </>
    );
}

export default ListGroup