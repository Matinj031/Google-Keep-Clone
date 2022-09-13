export const state = () => ({
  tasks: [],
  DeletedTasks : [],
  PinedTasks:[],
  ArchievedTasks:[],
  labels:[],
  colors : ['red','green','blue','black','cyan','yellow'],
  })
  
  export const mutations = {

    init(state,value) { 
          state.tasks = JSON.parse(value) || [];
     },
      initDeletedTasks(state,value) { 
          state.DeletedTasks = JSON.parse(value) || [];
     },
      initArchivedTasks(state,value) { 
          state.ArchievedTasks = JSON.parse(value) || [];
     },
     initLabels(state,value){
       state.labels = JSON.parse(value) || [];
     },
     resetAllTasks(state) { 
     state.tasks = [];
    },
    save(state) {
      localStorage.setItem('_tasks_', JSON.stringify(state.tasks))
    },
     saveDeletedTasks(state) {
      localStorage.setItem('_deletedTasks_', JSON.stringify(state.DeletedTasks))
    },
    saveArchived(state){
      localStorage.setItem('_archivedTasks_', JSON.stringify(state.ArchievedTasks))
    },
    savelabels(state){
       localStorage.setItem('_labels_', JSON.stringify(state.labels))
    },
    add(state, { title, description,bgcolor,textColor,Background,pinStats,labels }) {
      let id, flag = true
      bgcolor = 'white'
      while (flag) {
        id = Math.floor(Math.random() * Math.pow(10,6))
        flag = !!state.tasks.find(task => task.id === id)
      }
      state.tasks.push({
        id, title, description, done: false,pinStats : false ,bgcolor,textColor :'light',Background :'',labels:[]
      })
    },

    updatePinToggle(state,id){
      state.tasks.map(task => {
        if(task.id == id){
           task.pinStats = !task.pinStats 
        }
      })
    },

    updateTasksLabel(state,{id,labels}){
      state.tasks.map(task => {
        if(task.id == id){
           task.labels.push(labels)
        }
      })
    },
    addArchive(state,id){
      state.ArchievedTasks.push(state.tasks.find(task => task.id == id))
      state.tasks = state.tasks.filter(task => task.id !== id)
    },
    addlabel(state,name){
      let flag = true;
      let id;
       while (flag) {
        id = Math.floor(Math.random() * Math.pow(10,6))
        flag = !!state.labels.find(label => label.id === id)
      }
       state.labels.push({
        id:id,name
      })
    },
    deletelabel(state,id){
      state.labels = state.labels.filter(label => label.id !== id) 
    },

    updateLabel(state,{id,newValue}){
       state.labels.map(label => {
        if(label.id == id){
           label.name = newValue 
        }
      })
    },

    deleteLabelFromTask(state,{taskid,labelid}){
        state.tasks.find(task => {
          if(task.id == taskid){
           task.labels =  task.labels.filter(label => label.id !== labelid)
          }
        }) 
    },

     removeFromArchive(state,id){
       state.tasks.push(state.ArchievedTasks.find(task => task.id == id))
       state.ArchievedTasks = state.ArchievedTasks.filter(task => task.id !== id) 
    },
    remove(state, id) {
      state.DeletedTasks = state.DeletedTasks.filter(task => task.id !== id)
    },

    fakeRemove(state, { id , setedTime} ){
      let a = (state.tasks.find(task => task.id == id)) || (state.ArchievedTasks.find(task => task.id == id)) 
      let b = {...a,setedTime : setedTime}
     state.DeletedTasks.push(b)
     state.tasks = state.tasks.filter(task => task.id !== id)
     state.ArchievedTasks = state.ArchievedTasks.filter(task => task.id !== id)
    },
    fakeRemoveById(state,id){
    state.DeletedTasks = state.DeletedTasks.filter(task => task.id !== id)
    },
    fakeRemoveAll(state){
      Array.prototype.push.apply(state.DeletedTasks,state.tasks); 
      state.tasks = []
    },
    emptyfakeRemove(state){
     state.DeletedTasks = []
    },

    restoreFakeRemove(state,id){
     state.tasks.push(state.DeletedTasks.find(task => task.id === id ))
     state.DeletedTasks = state.DeletedTasks.filter(task => task.id !== id)
    
    },

    changeContent(state, { title,description,id }) { 
      if (!title || !description || id) { 
        state.tasks = state.tasks.map((task) => { 
          if (task.id == id) { 
            task.title = title,
              task.description = description
            return task
          }
        })
      }
    },
    done(state, {id, done = true}) {
      state.tasks = state.tasks.map((task) => {
        if (task.id === id) task.done = done
        return task
      })
    },

    changeColor(state, { id, bgcolor,textColor }) { 

      state.tasks = state.tasks.map(task => {
        if (task.id === id) { 
          task.bgcolor = bgcolor
          task.textColor = textColor
        }
          return task
      })
    },

    
    changeBackground(state, {id,NewBackground}) { 

          state.tasks = state.tasks.map(task => {
            if (task.id === id) { 
              task.Background = NewBackground
            }
            return task
      })
    },


    makeAcopy(state,id){
      let flag = true;
      let genId;
       while (flag) {
        genId = Math.floor(Math.random() * Math.pow(10,6))
        flag = !!state.tasks.find(task => task.genId === genId)
      }

      const findedTask = state.tasks.find(task => task.id == id);

      state.tasks.push({
        id:genId, title:findedTask.title, description:findedTask.description, done:findedTask.done,pinStats : findedTask.pinStats ,bgcolor:findedTask.bgcolor,textColor:findedTask.textColor ,Background:findedTask.Background ,labels:findedTask.labels
      })
    },
  }
  
export const actions = {
      
    init(context,value) { 
        context.commit('init', value)
    },
     initDeletedTasks(context,value) { 
        context.commit('initDeletedTasks', value)
    },
    initArchivedTasks(context,value) { 
         context.commit('initArchivedTasks', value)
     },
     initLabels(context,value){
      context.commit('initLabels', value)
     },
    resetAllTasks(context){
      context.commit('resetAllTasks')
      context.commit('save')
    },
    add(context, { title, description,bgcolor,textColor,Background,pinStats}) {
      context.commit('add', { title,pinStats, description ,bgcolor,textColor,Background})
      context.commit('save')
    },
     addlabel(context, name ) {
      context.commit('addlabel',name)
      context.commit('savelabels')
    },



    deletelabel(context,id){
      context.commit('deletelabel',id)
      context.commit('savelabels')
    },


    updateLabel(context,{id,newValue}){
       context.commit('updateLabel',{id,newValue})
        context.commit('savelabels')
    },

      deleteLabelFromTask(context,{taskid,labelid}){
        context.commit('deleteLabelFromTask',{taskid,labelid})
        context.commit('save')
    },

    updatePinToggle(context,id){
      context.commit('updatePinToggle', parseInt(id))
      context.commit('save')
    },


    updateTasksLabel(context,{id,labels}){
      context.commit('updateTasksLabel', {id : parseInt(id),labels :labels })
      context.commit('save')
    },
    addArchive(context,id){
      context.commit('addArchive', parseInt(id))
      context.commit('saveArchived')
      context.commit('save')
    },
    removeFromArchive(context,id){
      context.commit('removeFromArchive', parseInt(id))
      context.commit('saveArchived')
      context.commit('save')
    },

    remove(context, id) {
      context.commit('remove', parseInt(id))
      context.commit('saveDeletedTasks')
    },
     fakeRemove(context, { setedTime , id}) {
      context.commit('fakeRemove', { setedTime, id : parseInt(id) })
      context.commit('saveDeletedTasks')
      context.commit('saveArchived')
       context.commit('save')
    },
    fakeRemoveById(context,id){
      context.commit('fakeRemoveById', parseInt(id) )
      context.commit('saveDeletedTasks')
    },  
    fakeRemoveAll(context){
      context.commit('fakeRemoveAll')
      context.commit('saveDeletedTasks')
       context.commit('save')
    },
    emptyfakeRemove(context){
     context.commit('emptyfakeRemove')
      context.commit('saveDeletedTasks')
      context.commit('save')
    },

    restoreFakeRemove(context,id){
      context.commit('restoreFakeRemove', id)
      context.commit('saveDeletedTasks')
      context.commit('save')
    },
    done(context, {id, done = true}) {
      context.commit('done', {id: parseInt(id), done})
      context.commit('save')
  },
  changeContent(context, { title,description,id}) { 
    context.commit('changeContent', { id: parseInt(id), title, description })
    context.commit('save')
  },
  changeColor(context, { id, bgcolor,textColor }) { 
    context.commit('changeColor', {id: parseInt(id),bgcolor,textColor})
    context.commit('save')
  },
  changeBackground(context, { id, NewBackground }) { 
    context.commit('changeBackground', {id: parseInt(id),NewBackground})
    context.commit('save')
  },
    makeAcopy(context,id){
      context.commit('makeAcopy', parseInt(id))
      context.commit('save')
    },
  }
  
  export const getters = {
    tasks: (state) => {
      return state.tasks
    },
    doneTasks: (state) => {
      return state.tasks.filter(task => task.done == true)
    },
    pendingTasks: (state) => {
      return state.tasks.filter(task => task.done == false)
    },
    task: (state) => (id) => {
      return state.tasks.find(task => task.id === id)
    },
    colors: (state) => { 
      return state.colors
    },
    deletedTasks:(state) => {
      return state.DeletedTasks
    },
    pinedTasks:(state)=>{
        return state.tasks.filter(task => task.pinStats == true);
    },
     getArchivedTasks:(state)=>{
        return state.ArchievedTasks
    },
    labels:(state)=>{
      return state.labels
    },
    selectedLabels:(state)=>(id)=>{
      return state.tasks.find(task => task.id === id).labels
    },
     filterByLabelId:(state)=>(id)=>{
      return state.tasks.filter(task => task.labels.find(label => label.id == id))
  },
  }