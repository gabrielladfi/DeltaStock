import './sectionmenu.scss'

// eslint-disable-next-line react/prop-types
function SectionMenu({ children }) {
    return (
        <section className='sectionmenu'>
            { children }
         </section>
    )
}

export default SectionMenu
