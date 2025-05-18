import { useState , useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import CircleLoader from '../components/CircleLoader';
import LanguageSelector from '../components/LanguageSelector';
import ThemeToggle from '../components/ThemeToggler';
import { translations } from '../locales';
import './OptionsPage.css';
import {motion} from 'framer-motion'

const OptionsPage = () => {
  const navigate = useNavigate();
  const [databases, setDatabases] = useState<{ [key: string]: string[] }>({
    'Default DB': ['file1.csv', 'file2.json'],
    'Project DB': ['project1.csv'],
  });
  const [selectedDB, setSelectedDB] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDBName, setNewDBName] = useState('');
  const [newFileName, setNewFileName] = useState('');
  const [creatingType, setCreatingType] = useState<'database' | 'file'>('database');
  const [errorMsg, setErrorMsg] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage] = useState(1);
  const itemsPerPage = 5;
  const [language, setLanguage] = useState<'en' | 'ja'>('en');
  const [isLangSwitching, setIsLangSwitching] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang === 'ja' || savedLang === 'en') {
      setLanguage(savedLang);
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const timer = setTimeout(() => {
      setIsInitialLoading(false);
      setIsPageVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);


  const handleLanguageChange = (lang: 'en' | 'ja') => {
    setIsLangSwitching(true);
    setIsPageVisible(false);
    setTimeout(() => {
      setLanguage(lang);
      localStorage.setItem('preferredLanguage', lang);
      setIsLangSwitching(false);
      setIsPageVisible(true);
    }, 500);
  }


  const filteredDBNames = Object.keys(databases).filter(db =>
    db.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const paginatedDBs = filteredDBNames.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCreate = () => {
    setErrorMsg('');
    if (creatingType === 'database') {
      if (databases[newDBName]) {
        setErrorMsg('Database already exists!');
        return;
      }
      setDatabases({ ...databases, [newDBName]: [] });
    } else {
      if (!selectedDB) {
        setErrorMsg('Select a database to add file.');
        return;
      }
      if (databases[selectedDB]?.includes(newFileName)) {
        setErrorMsg('File already exists in this database!');
        return;
      }
      setDatabases({
        ...databases,
        [selectedDB]: [...(databases[selectedDB] || []), newFileName],
      });
    }
    setNewDBName('');
    setNewFileName('');
    setShowCreateModal(false);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = [...filteredDBNames];
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    const newDbList: { [key: string]: string[] } = {};
    items.forEach((db) => {
      newDbList[db] = databases[db];
    });
    setDatabases(newDbList);
  };

  const handleSubmit = () => {
    setIsPageVisible(false);
    setTimeout(() => {
      setIsNavigating(true);
      navigate('/menu');
    }, 500);
  };

   const text = translations[language];
   const isLoading =  isLangSwitching ||isInitialLoading || isNavigating;
  return (
    <>
      {isLoading && <CircleLoader show={true } />}
      <div className={`options-container ${isPageVisible ? 'fade-in' : 'fade-out'}`}>
        {isLoading && <CircleLoader show={true} />}

        <header className="home-header">
          <h2 className="company-name">PROJECT</h2>
          <div className="top-right-controls">
            <LanguageSelector onLanguageChange={handleLanguageChange} currentLanguage={language} />
            <ThemeToggle />
          </div>
        </header>
        {showCreateModal && (
          // <div className="creation-modal fade-in">
          <motion.div
          className="creation-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.01 }}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.99 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95, opacity: 0}}
              transition={{ duration: 0.1 }}
            >
              <h3>Create {creatingType === 'database' ? 'New Database' : 'New Data File'}</h3>
              <div className="toggle-create-type">
                <input
                  type="radio"
                  name="createType"
                  value="database"
                  id="create-database"
                  checked={creatingType === 'database'}
                  onChange={() => setCreatingType('database')}
                />
                <label htmlFor="create-database">Database</label>

                <input
                  type="radio"
                  name="createType"
                  value="file"
                  id="create-file"
                  checked={creatingType === 'file'}
                  onChange={() => setCreatingType('file')}
                />
                <label htmlFor="create-file">File</label>
              </div>
              {creatingType === 'database' ? (
                <input
                  type="text"
                  value={newDBName}
                  onChange={(e) => setNewDBName(e.target.value)}
                  placeholder="Enter database name"
                />
              ) : (
                <input
                  type="text"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="Enter file name"
                />
              )}
              {errorMsg && <p className="error-msg">{errorMsg}</p>}
              <div className="modal-actions">
                <button className="cancel" onClick={() => {
                  setShowCreateModal(false);
                  setErrorMsg('');
                  }}
                >Cancel</button>
                <button
                  onClick={handleCreate}
                  disabled={
                    (creatingType === 'database' && !newDBName) ||
                    (creatingType === 'file' && !newFileName)
                  }
                >
                  Create
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
{/* ////////////////////////////////////////////////////////////////////////////// */}
        <div className="selection-section">
          <div className="header">
            <h2>{text.Databases}</h2>
            <div className="controls">
              <input
                type="text"
                placeholder="Search databases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button onClick={() => {
                setCreatingType('database');
                setShowCreateModal(true);
              }} className="create-button">
                + New
              </button>
            </div>
          </div>
          <div className="database-list-wrapper">
            {filteredDBNames.length === 0 ? (
              <div className="empty-state">
                <p>No databases found. Create one to get started!</p>
              </div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="databases">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="database-list">
                      {paginatedDBs.map((db, index) => (
                        <Draggable key={db} draggableId={db} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`database-item ${selectedDB === db ? 'selected' : ''} ${snapshot.isDragging ? 'dragging' : ''}`}
                              onClick={() => {
                                setSelectedDB(db);
                                setSelectedFile('');
                              }}
                            >
                              <span>{db}</span>
                              {selectedDB === db && <span className="checkmark">✓</span>}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>

          {selectedDB && (
            <div className="file-list">
              <h3>Files in {selectedDB}</h3>
              <div className="file-items">
                {databases[selectedDB]?.map(file => (
                  <div
                    key={file}
                    className={`file-item ${selectedFile === file ? 'selected' : ''}`}
                    onClick={() => setSelectedFile(file)}
                  >
                    {file}
                  </div>
                ))}
                <button
                  className="add-file-button"
                  onClick={() => {
                    setCreatingType('file');
                    setShowCreateModal(true);
                  }}
                >
                  + Add File
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          className="proceed-button"
          onClick={() => {
            if (!selectedDB || !selectedFile) {
              alert('Please select both a database and a file to proceed.');
              return;
            }
            handleSubmit();
            // navigate('/analysis');
          }}
        >
          Submit
        </button>
      </div>
    </>  
  );
};

export default OptionsPage;
