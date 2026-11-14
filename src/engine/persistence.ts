/**
 * IndexedDB persistence layer.
 * Saves and loads full GameState blobs.
 */

import type { GameState } from '../types/game'

const DB_NAME = 'DugoutDB'
const DB_VERSION = 1
const STORE_SAVES = 'saves'

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_SAVES)) {
        db.createObjectStore(STORE_SAVES, { keyPath: 'id' })
      }
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

export async function saveGame(state: GameState): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_SAVES, 'readwrite')
    tx.objectStore(STORE_SAVES).put({ ...state, updated: Date.now() })
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export async function loadGame(id: string): Promise<GameState | null> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE_SAVES).objectStore(STORE_SAVES).get(id)
    req.onsuccess = () => resolve(req.result ?? null)
    req.onerror = () => reject(req.error)
  })
}

export async function listSaves(): Promise<Pick<GameState, 'id' | 'created' | 'updated' | 'currentSeason' | 'currentWeek'>[]> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE_SAVES).objectStore(STORE_SAVES).getAll()
    req.onsuccess = () => {
      const saves = (req.result as GameState[]).map(({ id, created, updated, currentSeason, currentWeek }) => ({
        id, created, updated, currentSeason, currentWeek
      }))
      resolve(saves.sort((a, b) => b.updated - a.updated))
    }
    req.onerror = () => reject(req.error)
  })
}

export async function deleteSave(id: string): Promise<void> {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_SAVES, 'readwrite')
    tx.objectStore(STORE_SAVES).delete(id)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}
