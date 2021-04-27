import React from 'react'
import styles from '../../styles/footer.module.css'

const FooterElement = () => {
    return (
        <div>
            <footer className={styles.footer}>
                <div>
                    &#169; VHS - Movie Hiring.
                </div>
                <div>
                    <p>&#174; The JavScript Learning Group <sup>&#8482;</sup></p>
                </div>
        
                Powered by{' '}
                <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
            </footer>     
        </div>
    )
}

export default FooterElement
