import { useEffect, useState } from 'react';

const CMD_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789-_./:@&%[]{}()=><|\\';
const ERR_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%:._-=><|';

function randChar(pool: string) {
  return pool[Math.floor(Math.random() * pool.length)];
}

function scramble(
  finalText: string,
  pool: string,
  spd: number,
  onTick: (text: string) => void,
): Promise<void> {
  return new Promise(resolve => {
    const len = finalText.length;
    let revealed = 0;
    let frame = 0;

    function tick() {
      frame++;
      if (frame % 3 === 0 && revealed < len) revealed++;
      let out = '';
      for (let i = 0; i < len; i++) {
        if (i < revealed) {
          out += finalText[i];
        } else {
          out += finalText[i] === ' ' ? ' ' : randChar(pool);
        }
      }
      onTick(out);
      if (revealed < len) {
        setTimeout(tick, spd);
      } else {
        onTick(finalText);
        resolve();
      }
    }
    tick();
  });
}

function delay(ms: number) {
  return new Promise<void>(r => setTimeout(r, ms));
}

export interface TerminalLine {
  id: string;
  type: 'cmd' | 'err' | 'ok' | 'dim' | 'cursor';
  final?: string;
  speed?: number;
  text?: string;
  visible: boolean;
}

const TERMINAL_SEQUENCE: Omit<TerminalLine, 'visible' | 'text'>[] = [
  { id: 'tl-1', type: 'cmd', final: 'ping api.yourserver.com', speed: 7 },
  { id: 'tl-2', type: 'err', final: '✗ Connection timeout - 30 000 ms', speed: 6 },
  { id: 'tl-3', type: 'cmd', final: 'systemctl status backend.service', speed: 7 },
  { id: 'tl-4', type: 'err', final: '✗ Active: failed — code=500, RESULT=exit-code', speed: 16 },
  { id: 'tl-5', type: 'cmd', final: 'check memory & cpu usage', speed: 7 },
  { id: 'tl-6', type: 'dim', final: '⚠ RAM: 67.0% · CPU: 69% · Swap: full', speed: 6 },
  { id: 'tl-7', type: 'cmd', final: 'alert oncall-team --priority=critical', speed: 7 },
  { id: 'tl-8', type: 'ok', final: '✓ PagerDuty fired — engineers are awake now', speed: 6 },
  { id: 'tl-9', type: 'cursor' },
];

export function useTerminalAnimation() {
  const [lines, setLines] = useState<TerminalLine[]>(
    TERMINAL_SEQUENCE.map(l => ({ ...l, visible: false, text: '' }))
  );

  const updateLine = (id: string, updates: Partial<TerminalLine>) => {
    setLines(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  useEffect(() => {
    let cancelled = false;

    async function run() {
      await delay(300);

      const pairs: [string, string, number][] = [
        ['tl-1', 'tl-2', 40],
        ['tl-3', 'tl-4', 100],
        ['tl-5', 'tl-6', 100],
        ['tl-7', 'tl-8', 140],
      ];

      for (const [cmdId, respId, pauseAfter] of pairs) {
        if (cancelled) return;
        const cmdLine = TERMINAL_SEQUENCE.find(l => l.id === cmdId)!;
        const respLine = TERMINAL_SEQUENCE.find(l => l.id === respId)!;

        // show cmd line
        updateLine(cmdId, { visible: true, text: '' });
        await scramble(
          cmdLine.final!,
          CMD_CHARS,
          cmdLine.speed!,
          text => updateLine(cmdId, { text })
        );
        if (cancelled) return;
        await delay(40);

        // show response line
        updateLine(respId, { visible: true, text: '' });
        const pool = respLine.type === 'ok' || respLine.type === 'dim' ? ERR_CHARS : ERR_CHARS;
        await scramble(
          respLine.final!,
          pool,
          respLine.speed!,
          text => updateLine(respId, { text })
        );
        if (cancelled) return;
        await delay(pauseAfter);
      }

      if (!cancelled) {
        updateLine('tl-9', { visible: true });
      }
    }

    run();
    return () => { cancelled = true; };
  }, []);

  return lines;
}
