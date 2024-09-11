import React from 'react';
import style from './PageLayout.module.css';

type PageLayoutProps = {
    title: string;
    mainContent?: React.ReactNode;
    settingsContent?: React.ReactNode;
    children: React.ReactNode;
};

const PageLayout: React.FC<PageLayoutProps> = ({ title, mainContent, settingsContent, children }) => {
    return (
        <main>
            <div className={style.header}>
                <div className={style.main}>
                    <h1>{title}</h1>
                    {mainContent}
                </div>
                <div className={style.settings}>
                    {settingsContent}
                </div>
            </div>
            {children}
        </main>
    );
};

export default PageLayout;
