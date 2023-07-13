
import React, { useState } from 'react';
import styled from 'styled-components';


const SinglePasswordItem = ({ title, children }) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };
  
    return (
        <AccordionContainer>
        <AccordionHeader onClick={toggleAccordion}>
          {title}
        </AccordionHeader>
        {isOpen && (
          <AccordionContent>
            {children}
          </AccordionContent>
        )}
      </AccordionContainer>
    );

}

export default SinglePasswordItem;

const AccordionContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const AccordionHeader = styled.div`
  background-color: #f9f9f9;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
`;

const AccordionContent = styled.div`
  padding: 10px;
`;


