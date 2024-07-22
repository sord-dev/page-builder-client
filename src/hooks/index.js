import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import { LinkBuilder } from '../utils';

export const useComponentRefs = (components, handleClick) => { // Hook that takes in components and handleClick function and returns componentRefs
    const componentRefs = useRef([]);

    useEffect(() => {
        componentRefs.current.forEach((ref, index) => {
            if (ref) {
                const clickHandler = () => handleClick({ component: components[index], index });
                ref.addEventListener('click', clickHandler);
                ref.clickHandler = clickHandler; // Store handler for cleanup
            }
        });

        return () => {
            componentRefs.current.forEach((ref) => {
                if (ref) {
                    ref.removeEventListener('click', ref.clickHandler);
                }
            });
        };
    }, [components, handleClick]);

    return componentRefs;
};

export const useLinkBasedSiteBuilder = () => { // Hook that returns pageState and functions to update pageState. To be used in LinkBasedSiteBuilderPage
    const [pageState, setPageState] = useState({
        components: [],
        templates: { index: [] }, // Maps template IDs to templates
        pages: [{ name: 'New Page', path: '/', templateId: 'index' }],
        currentPageId: 'index',
    });

    const { appState } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!appState.components.index) return;
        setPageState(prev => ({ ...prev, components: appState.components.index }));
    }, [appState]);

    const onComponentClick = (component, position = 'after', index = null) => {
        if (!component) throw new Error('No component provided');
        if (!['before', 'after'].includes(position)) throw new Error('Invalid position provided');

        const newTemplates = { ...pageState.templates };
        const currentTemplate = newTemplates[pageState.currentPageId];

        if (index == null) {
            newTemplates[pageState.currentPageId] = position === 'before'
                ? [component, ...currentTemplate]
                : [...currentTemplate, component];
        } else {
            currentTemplate.splice(position === 'before' ? index : index + 1, 0, component);
            newTemplates[pageState.currentPageId] = currentTemplate;
        }

        setPageState(prev => ({ ...prev, templates: newTemplates }));
    };

    const updateComponentTemplateItem = (updatedItem, index) => {
        const newTemplates = { ...pageState.templates };
        newTemplates[pageState.currentPageId] = newTemplates[pageState.currentPageId].map((item, i) => (i === index ? updatedItem : item));
        setPageState(prev => ({ ...prev, templates: newTemplates }));
    };

    const removeComponentFromTemplate = (index) => {
        const newTemplates = { ...pageState.templates };
        newTemplates[pageState.currentPageId] = newTemplates[pageState.currentPageId].filter((_, i) => i !== index);
        setPageState(prev => ({ ...prev, templates: newTemplates }));
    };

    const resetTemplate = () => {
        const newTemplates = { ...pageState.templates };
        newTemplates[pageState.currentPageId] = [];
        setPageState(prev => ({ ...prev, templates: newTemplates }));
    };

    const addPage = (name, path) => {
        const newTemplateId = `page_${Object.keys(pageState.templates).length}`;
        setPageState(prev => ({
            ...prev,
            templates: { ...prev.templates, [newTemplateId]: [] },
            pages: [...prev.pages, { name, path, templateId: newTemplateId }],
        }));
    };

    const removePage = (templateId) => {
        if(pageState.pages.length === 1) return;
        const newTemplates = { ...pageState.templates };
        delete newTemplates[templateId];
        setPageState(prev => ({
            ...prev,
            templates: newTemplates,
            pages: prev.pages.filter(page => page.templateId !== templateId),

        }));
    };

    const selectPage = (templateId) => {
        setPageState(prev => ({ ...prev, currentPageId: templateId }));
    };

    const submitTemplate = () => {
        navigate(LinkBuilder.buildLink({ templates: pageState.templates, pages: pageState.pages }));
    };

    return {
        pageState,
        onComponentClick,
        updateComponentTemplateItem,
        removeComponentFromTemplate,
        resetTemplate,
        addPage,
        removePage,
        selectPage,
        submitTemplate,
    };
};
