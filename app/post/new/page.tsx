'use client';

import {
  SimpleMDEReactProps,
  SimpleMdeReact
} from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useContext, useMemo } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

const NewPost = () => {
  const { theme } = useContext(ThemeContext);

  const editorOptions = useMemo(() => {
    return {
      placeholder: 'Type here...',
      hideIcons: ['fullscreen'],
      sideBySideFullscreen: false
    } as SimpleMDEReactProps;
  }, []);

  return (
    <div>
      <SimpleMdeReact options={editorOptions} />
    </div>
  );
};

export default NewPost;
