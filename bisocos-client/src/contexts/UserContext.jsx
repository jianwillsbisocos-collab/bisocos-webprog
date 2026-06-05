import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchUsers, createUser } from '../services/UserServices';

const UserContext = createContext(null);

const STORAGE_KEY = 'ui_users_cache_v1';

export const useUsers = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUsers must be used within a UserProvider');
  return ctx;
};

export const UserProvider = ({ children }) => {
  const [userRows, setUserRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [syncError, setSyncError] = useState(null);

  // Load from localStorage immediately for dashboard responsiveness
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUserRows(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const persist = (nextRows) => {
    setUserRows(nextRows);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextRows));
    } catch {
      // ignore
    }
  };

  // Best-effort sync from backend so username taken validation can be realistic.
  const syncFromBackend = async () => {
    setIsLoading(true);
    setSyncError(null);
    try {
      const { data } = await fetchUsers();
      // backend returns: { users }
      const rows = data?.users || [];

      // Normalize ids to be compatible with DataGrid (expects id field)
      const normalized = rows.map((u, idx) => ({
        id: u._id ?? u.id ?? idx + 1,
        username: u.username,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        age: u.age,
        role: u.role,
        gender: u.gender,
        status: u.status ?? (u.isActive ? 'Active' : 'Inactive'),
      }));

      persist(normalized);
      return normalized;
    } catch (e) {
      setSyncError(e?.message || 'Failed to sync users');
      // Keep whatever is in local cache
      return userRows;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Sync once on mount (non-breaking)
    syncFromBackend();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isUsernameTaken = (username) => {
    const u = username.trim().toLowerCase();
    return userRows.some((r) => (r.username || '').trim().toLowerCase() === u);
  };

  const signupViaBackendThenCache = async ({ form }) => {
    const nextId = Date.now();

    const buildRow = (source = {}) => ({
      id: source._id ?? source.id ?? nextId,
      username: source.username ?? form.username,
      firstName: source.firstName ?? form.firstName,
      lastName: source.lastName ?? form.lastName,
      email: source.email ?? form.email,
      age: source.age ?? form.age,
      role: source.role ?? form.role,
      gender: source.gender ?? form.gender,
      status: source.status ?? (source.isActive ? 'Active' : form.status),
    });

    const payload = {
      username: form.username,
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      age: form.age,
      role: form.role,
      gender: form.gender,
      status: form.status,
      isActive: form.status === 'Active',
      contactNumber: form.contactNumber,
      password: form.password,
      type: form.type ?? 'editor',
      address: form.address ?? 'N/A',
    };

    const { data } = await createUser(payload);
    const nextRow = buildRow(data);
    persist([nextRow, ...userRows]);
    return nextRow;
  };

  const value = useMemo(
    () => ({
      userRows,
      setUserRows: persist,
      isLoading,
      syncError,
      syncFromBackend,
      isUsernameTaken,
      signupViaBackendThenCache,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [userRows, isLoading, syncError]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

