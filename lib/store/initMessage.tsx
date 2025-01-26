'use client';

import { useEffect, useRef } from 'react';
import { IMessage, useMessages } from './messages';

export default function InitMessages({ messages }: { messages: IMessage[] }) {
  const initState = useRef(false);
  useEffect(() => {
    if (!initState.current) {
      useMessages.setState({ messages });
    }
    initState.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
}
