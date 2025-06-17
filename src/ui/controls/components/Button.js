export const createToggleButton = (text, {position = 'top', onClick}) => {
    const buttonStyles = {
        width: '40px',
        height: '40px',
        backgroundColor: '#666',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        fontSize: '20px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        transition: 'background-color 0.3s ease',
        position: 'absolute',
        right: '10px',
        top: position === 'top' ? '10px' : '60px',
        zIndex: '1001'
    };

    const toggle = document.createElement('button');
    toggle.textContent = text;
    Object.assign(toggle.style, buttonStyles);
    toggle.addEventListener('click', onClick);
    
    return toggle;
};

export const createStyledButton = (text, customStyles = {}) => {
    const button = document.createElement('button');
    button.textContent = text;
    
    const defaultStyles = {
        backgroundColor: '#666',
        border: 'none',
        borderRadius: '5px',
        color: 'white',
        padding: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    };

    Object.assign(button.style, defaultStyles, customStyles);
    
    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#888';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '#666';
    });

    return button;
};