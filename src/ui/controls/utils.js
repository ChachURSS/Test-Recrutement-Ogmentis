export function createStyledButton(text, additionalStyles = {}) {
    const button = document.createElement('button');
    
    // Default styles
    const defaultStyles = {
        padding: '10px',
        backgroundColor: '#666',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease'
    };

    // Merge default styles with additional styles
    Object.assign(button.style, defaultStyles, additionalStyles);
    
    button.textContent = text;
    
    // Add hover effect
    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#888';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '#666';
    });

    return button;
}