import React from 'react';
import classes from './Pagination.css'

import Previous from './Previous/Previous';
import Node from './Node/Node';
import Next from './Next/Next';

const pagination = props => {
    let arrayOfNodes = [];

    for (let i = 1; i <= props.numberOfNode; i++) {
        arrayOfNodes.push(i)
    }

    return (
        <div className={classes.PaginationContainer}>
            <ul style={{listStyleType: 'none'}} className={classes.Pagination}>
                {/* Previous */}
                <Previous
                    previousIsClicked={props.previousIsClicked}
                    isDisabled={props.nodeIsSelected === 1 ? true : false}>
                        ←
                        &nbsp;&nbsp;
                        Previous
                </Previous>
                
                {/* Nodes */}

                {/* Disabled Nodes */}
                {(props.nodeIsSelected >= 5) ?
                    <Node
                        isSelected={props.nodeIsSelected === 1 ? true : false}
                        nodeIsClicked={() => props.nodeIsClicked(1)}>
                            1
                    </Node> : null}

                {(props.nodeIsSelected >= 5) ? 
                    <li className={classes.DisabledNode}>
                        ...
                    </li> : null}

                {/* Main Nodes */}
                
                {(props.nodeIsSelected > 4) ? arrayOfNodes.slice(props.nodeIsSelected - 2, props.nodeIsSelected + 1).map((node, index) => {
                    return (
                        <Node
                            isSelected={props.nodeIsSelected === node ? true : false}
                            nodeIsClicked={() => props.nodeIsClicked(node)}>
                                {node}
                        </Node>
                    )
                }) : 
                (3 <= props.nodeIsSelected && props.nodeIsSelected <= 4) ? arrayOfNodes.slice(0, props.nodeIsSelected + 1).map((node, index) => {
                    return (
                        <Node
                            isSelected={props.nodeIsSelected === node ? true : false}
                            nodeIsClicked={() => props.nodeIsClicked(node)}>
                                {node}
                        </Node>
                    )
                }) : arrayOfNodes.slice(0, 3).map((node, index) => {                    
                    return (
                        <Node
                            isSelected={props.nodeIsSelected === node ? true : false}
                            nodeIsClicked={() => props.nodeIsClicked(node)}>
                                {node}
                        </Node>
                    )
                })}
                 
                {/* Disabled Nodes */}
                {((props.numberOfNode > 5 && props.nodeIsSelected < props.numberOfNode && props.numberOfNode - props.nodeIsSelected > 2) || (props.numberOfNode > 3 && props.nodeIsSelected <= 3)) ? 
                    <li className={classes.DisabledNode}>
                        ...
                    </li> : null}
                
                    {((props.numberOfNode > 5 && props.nodeIsSelected < props.numberOfNode && props.numberOfNode - props.nodeIsSelected > 1) || (props.numberOfNode > 3 && props.nodeIsSelected <= 3)) ? 
                    <Node
                        isSelected={props.nodeIsSelected === props.numberOfNode ? true : false}
                        nodeIsClicked={() => props.nodeIsClicked(props.numberOfNode)}>
                            {props.numberOfNode}
                    </Node> : null}

                {/* Next */}
                <Next
                    nextIsClicked={props.nextIsClicked}
                    isDisabled={props.nodeIsSelected === props.numberOfNode ? true : false}>
                        Next
                        &nbsp;&nbsp;
                        →
                </Next>
            </ul>
        </div>
    )
};

export default pagination;
