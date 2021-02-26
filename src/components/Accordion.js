import React, {useState} from 'react';

const Accordion = ({items}) =>{

    const [activeIndex, setActiveIndex] = useState(null);

    const onTitleClick = (index) =>{
        setActiveIndex(index);
    }
    
    const renderedItems = items.map((item, index) =>{

        //this compares the iterated index with the clicked index
        //if they are the same it'll add the active to the class name of the title
        //making it open
        const active = index === activeIndex ? 'active' : '';

        return (
            <React.Fragment key={item.title}>
                <div className={`title ${active}`} onClick={() => onTitleClick(index)}>
                    <i className="dropdown icon"></i>
                    {item.title}
                </div>
                <div className={`content ${active}`}>
                    <p>{item.content}</p>
                </div>
            </React.Fragment>
        );
    });
    return <div className="ui styled accordion">{renderedItems}</div>;
};

export default Accordion;

