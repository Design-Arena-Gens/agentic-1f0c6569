'use client'

import { useState, useEffect } from 'react'

type GateType = 'AND' | 'OR' | 'NOT'

interface Gate {
  id: string
  type: GateType
  x: number
  y: number
  inputA: boolean
  inputB?: boolean
}

export default function Home() {
  const [gates, setGates] = useState<Gate[]>([
    { id: '1', type: 'AND', x: 100, y: 100, inputA: false, inputB: false },
    { id: '2', type: 'OR', x: 100, y: 250, inputA: false, inputB: false },
    { id: '3', type: 'NOT', x: 100, y: 400, inputA: false },
  ])

  const calculateOutput = (gate: Gate): boolean => {
    switch (gate.type) {
      case 'AND':
        return gate.inputA && (gate.inputB ?? false)
      case 'OR':
        return gate.inputA || (gate.inputB ?? false)
      case 'NOT':
        return !gate.inputA
      default:
        return false
    }
  }

  const toggleInput = (gateId: string, input: 'A' | 'B') => {
    setGates(gates.map(gate => {
      if (gate.id === gateId) {
        if (input === 'A') {
          return { ...gate, inputA: !gate.inputA }
        } else if (input === 'B' && gate.inputB !== undefined) {
          return { ...gate, inputB: !gate.inputB }
        }
      }
      return gate
    }))
  }

  const addGate = (type: GateType) => {
    const newGate: Gate = {
      id: Date.now().toString(),
      type,
      x: 100,
      y: gates.length * 150 + 100,
      inputA: false,
      ...(type !== 'NOT' && { inputB: false })
    }
    setGates([...gates, newGate])
  }

  const removeGate = (gateId: string) => {
    setGates(gates.filter(gate => gate.id !== gateId))
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#333',
          marginBottom: '10px',
          fontSize: '2.5rem'
        }}>
          Logic Circuit Simulator
        </h1>
        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '30px'
        }}>
          Interactive AND, OR, NOT Gates
        </p>

        <div style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          marginBottom: '30px'
        }}>
          <button
            onClick={() => addGate('AND')}
            style={{
              padding: '12px 24px',
              background: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'transform 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            + AND Gate
          </button>
          <button
            onClick={() => addGate('OR')}
            style={{
              padding: '12px 24px',
              background: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'transform 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            + OR Gate
          </button>
          <button
            onClick={() => addGate('NOT')}
            style={{
              padding: '12px 24px',
              background: '#FF9800',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'transform 0.2s'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            + NOT Gate
          </button>
        </div>

        <div style={{
          display: 'grid',
          gap: '20px',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'
        }}>
          {gates.map(gate => {
            const output = calculateOutput(gate)
            return (
              <div
                key={gate.id}
                style={{
                  background: '#f5f5f5',
                  borderRadius: '15px',
                  padding: '25px',
                  border: '3px solid #ddd',
                  position: 'relative'
                }}
              >
                <button
                  onClick={() => removeGate(gate.id)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: '#f44336',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    fontSize: '18px',
                    fontWeight: 'bold'
                  }}
                >
                  ×
                </button>

                <h2 style={{
                  textAlign: 'center',
                  color: '#333',
                  marginBottom: '20px',
                  fontSize: '1.8rem'
                }}>
                  {gate.type} Gate
                </h2>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '15px',
                    gap: '15px'
                  }}>
                    <span style={{ fontWeight: 'bold', minWidth: '80px' }}>Input A:</span>
                    <button
                      onClick={() => toggleInput(gate.id, 'A')}
                      style={{
                        padding: '10px 20px',
                        background: gate.inputA ? '#4CAF50' : '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        flex: 1
                      }}
                    >
                      {gate.inputA ? '1 (ON)' : '0 (OFF)'}
                    </button>
                  </div>

                  {gate.type !== 'NOT' && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '15px',
                      gap: '15px'
                    }}>
                      <span style={{ fontWeight: 'bold', minWidth: '80px' }}>Input B:</span>
                      <button
                        onClick={() => toggleInput(gate.id, 'B')}
                        style={{
                          padding: '10px 20px',
                          background: gate.inputB ? '#4CAF50' : '#f44336',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          fontWeight: 'bold',
                          flex: 1
                        }}
                      >
                        {gate.inputB ? '1 (ON)' : '0 (OFF)'}
                      </button>
                    </div>
                  )}
                </div>

                <div style={{
                  background: 'white',
                  padding: '20px',
                  borderRadius: '10px',
                  textAlign: 'center',
                  border: `3px solid ${output ? '#4CAF50' : '#f44336'}`
                }}>
                  <span style={{ fontWeight: 'bold', fontSize: '18px' }}>Output: </span>
                  <span style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: output ? '#4CAF50' : '#f44336'
                  }}>
                    {output ? '1 (ON)' : '0 (OFF)'}
                  </span>
                </div>

                <div style={{
                  marginTop: '15px',
                  padding: '10px',
                  background: '#e3f2fd',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#666'
                }}>
                  <strong>Logic:</strong> {
                    gate.type === 'AND' ? 'A AND B' :
                    gate.type === 'OR' ? 'A OR B' :
                    'NOT A'
                  }
                </div>
              </div>
            )
          })}
        </div>

        {gates.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '50px',
            color: '#999',
            fontSize: '18px'
          }}>
            Add gates using the buttons above to start building your circuit
          </div>
        )}

        <div style={{
          marginTop: '40px',
          padding: '20px',
          background: '#f9f9f9',
          borderRadius: '10px'
        }}>
          <h3 style={{ color: '#333', marginBottom: '10px' }}>About Logic Gates:</h3>
          <ul style={{ color: '#666', lineHeight: '1.8' }}>
            <li><strong>AND Gate:</strong> Output is 1 only when both inputs are 1</li>
            <li><strong>OR Gate:</strong> Output is 1 when at least one input is 1</li>
            <li><strong>NOT Gate:</strong> Output is the opposite of the input</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
