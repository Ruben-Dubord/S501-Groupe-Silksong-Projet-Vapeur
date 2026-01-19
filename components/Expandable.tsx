import React, { useState } from 'react'
import { Button, Text } from 'react-native';

const Expandable = ({children, maxChars=200}) => {

    let [expanded, setExpanded] = useState(true);
    
    if (children.length <= maxChars) return <Text style={{ margin: 10 }}>{children}</Text>

    let text = expanded ? children.substring(0, maxChars) : children

    return (
        <>
            <Text style={{ margin: 10 }}>{text}</Text>
            <Text style = {{ color: 'lightblue' }} onPress={() => setExpanded(!expanded)}>{expanded? "...   Voir plus": "    Voir moins"}</Text>
        </>
    )
}

export default Expandable
