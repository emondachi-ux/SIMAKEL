# TODO App - Simple & Powerful Task Management

A modern, feature-rich to-do list application with local storage, offline support, and beautiful UI.

## ✨ Features

### Core Features
- ✅ Create, read, update, delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Local storage persistence
- ✅ Automatic data backup
- ✅ Search & filter tasks
- ✅ Priority levels (High, Medium, Low)
- ✅ Due dates with visual indicators
- ✅ Categories/tags support
- ✅ Recurring tasks
- ✅ Notes & descriptions

### UI/UX Features
- ✅ Beautiful, modern interface
- ✅ Dark mode / Light mode
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations
- ✅ Toast notifications
- ✅ Drag & drop reordering
- ✅ Keyboard shortcuts
- ✅ Progress tracking

### Data Management
- ✅ Local storage (IndexedDB)
- ✅ Export to JSON
- ✅ Import from JSON
- ✅ Backup & restore
- ✅ Automatic sync
- ✅ Data persistence across sessions

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Local Storage:** IndexedDB + LocalStorage
- **Build Tool:** Vite
- **Animation:** Framer Motion
- **Icons:** Lucide React

## 🚀 Quick Start

### Installation

```bash
cd todo-app
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
todo-app/
├── src/
│   ├── components/          # React components
│   │   ├── TodoForm.tsx
│   │   ├── TodoList.tsx
│   │   ├── TodoItem.tsx
│   │   ├── FilterBar.tsx
│   │   ├── StatsCard.tsx
│   │   └── ...
│   ├── hooks/               # Custom hooks
│   │   ├── useTodos.ts
│   │   ├── useStorage.ts
│   │   └── useKeyboardShortcuts.ts
│   ├── lib/                 # Utilities
│   │   ├── db/
│   │   ├── storage/
│   │   └── utils.ts
│   ├── store/               # Zustand stores
│   │   ├── todoStore.ts
│   │   └── uiStore.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── styles/              # CSS
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── public/                  # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

## 📝 Usage

### Add a Task
1. Enter task title in input field
2. (Optional) Set priority, due date, and category
3. Click "Add Task" or press Enter

### Manage Tasks
- **Complete:** Click checkbox or press Space
- **Edit:** Click task to edit inline
- **Delete:** Click delete icon
- **Drag:** Reorder tasks by dragging

### Filter & Search
- Search by task name
- Filter by priority
- Filter by category
- Filter by status (Active, Completed)
- Filter by due date (Today, Tomorrow, This Week, Overdue)

### Export/Import
- Export all tasks as JSON backup
- Import tasks from backup file
- Clear all data (with confirmation)

### Keyboard Shortcuts
- `Ctrl/Cmd + K` - Focus search
- `Ctrl/Cmd + N` - New task
- `Ctrl/Cmd + E` - Export
- `Ctrl/Cmd + I` - Import
- `Escape` - Close modals
- `Enter` - Add/Save task

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.ts` to customize colors:

```typescript
// Primary color for completed tasks
// Success color for positive actions
// Warning color for high priority tasks
```

### Storage Options
Configure storage in `src/lib/storage/config.ts`:

```typescript
export const STORAGE_CONFIG = {
  useIndexedDB: true,
  useLocalStorage: true,
  autoBackup: true,
  backupInterval: 3600000, // 1 hour
};
```

## 📊 Data Types

```typescript
interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category?: string;
  dueDate?: Date;
  recurring?: 'daily' | 'weekly' | 'monthly';
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface TodoFilter {
  searchText: string;
  priority?: string;
  category?: string;
  status?: 'all' | 'active' | 'completed';
  dueDateRange?: 'today' | 'tomorrow' | 'week' | 'overdue';
}
```

## 🔄 Local Storage Strategy

### IndexedDB (Primary)
- Stores complete task objects
- Fast read/write
- Large storage capacity
- Auto-backup support

### LocalStorage (Fallback)
- Stores stringified JSON
- Simple backup format
- Quick access

### Sync Strategy
```
App Start
  ↓
Load from IndexedDB
  ↓
Sync with LocalStorage
  ↓
Validate data integrity
  ↓
Ready
```

## 🧪 Features Explained

### Recurring Tasks
Tasks can recur daily, weekly, or monthly. When completed, they automatically create a new instance.

### Priority System
- 🔴 High - Red
- 🟡 Medium - Yellow
- 🟢 Low - Green

### Due Date Indicators
- 🔴 Overdue (red)
- 🟡 Today (yellow)
- 🟠 Tomorrow (orange)
- ⚪ Future (gray)
- ✅ Completed (green)

### Categories
Organize tasks by:
- Work
- Personal
- Shopping
- Health
- Finance
- Custom categories

## 📱 Responsive Design

- **Mobile:** Single column, optimized touch targets
- **Tablet:** Two columns, larger spacing
- **Desktop:** Multi-column layout, sidebar navigation

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+K` | Focus search |
| `Ctrl+N` | New task |
| `Ctrl+E` | Export tasks |
| `Ctrl+I` | Import tasks |
| `Escape` | Close modal/dialog |
| `Enter` | Add/Save task |
| `Space` | Toggle task completion |
| `Delete` | Delete task |

## 📈 Statistics

Track your productivity:
- Total tasks
- Completed tasks
- Completion percentage
- Tasks by priority
- Tasks by category
- Overdue tasks
- Due today

## 🔐 Data Privacy

✅ All data stored locally
✅ No cloud sync (optional feature)
✅ No analytics tracking
✅ Export your data anytime
✅ Delete all data anytime

## 🐛 Troubleshooting

### Tasks not saving?
1. Check browser's local storage quota
2. Clear cache and reload
3. Export tasks as backup first
4. Reset and import backup

### Storage quota exceeded?
1. Delete old completed tasks
2. Export and archive tasks
3. Use different browser (more storage)

## 🚀 Future Enhancements

- [ ] Cloud sync (Firebase/Supabase)
- [ ] Collaborative lists
- [ ] Mobile app (React Native)
- [ ] Voice input
- [ ] AI task suggestions
- [ ] Calendar integration
- [ ] Notifications
- [ ] Time tracking
- [ ] Habit tracking
- [ ] Team collaboration

## 📄 License

MIT - Feel free to use for personal or commercial projects

## 👨‍💻 Author

Created by Fidelis Aprianus Dachi

---

**Made with ❤️ for productivity**
