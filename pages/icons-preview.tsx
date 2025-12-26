import React from 'react';
import * as Icons from '../packages/module-theme/components/elements/Icon';

export default function IconsPreview() {
  // 过滤出函数组件（图标）
  const entries = Object.entries(Icons).filter(
    ([name, comp]) => typeof comp === 'function'
  );

  return (
    <div style={{ padding: 24, fontFamily: 'Inter, Arial, sans-serif' }}>
      <h1 style={{ marginBottom: 16 }}>Icons Preview</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: 16,
        }}
      >
        {entries.map(([name, Comp]) => (
          <div
            key={name}
            style={{
              border: '1px solid #e6e6e6',
              borderRadius: 8,
              padding: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              background: '#fff',
            }}
          >
            <div
              style={{
                width: 96,
                height: 96,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* 强制 any 以兼容有/无 props 的组件 */}
              {React.createElement(Comp as any, { hover: 'text-black' })}
            </div>
            <div style={{ fontSize: 12, color: '#111' }}>{name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
