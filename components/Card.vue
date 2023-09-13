<template>
  <div :class="containerClasses">
    <div :class="topSectionClasses" class="h-2/3 w-full relative">
      <slot name="main" />
      <div class="absolute inset-0 flex items-center justify-center opacity-0 bg-black bg-opacity-60 hover:opacity-100 duration-500 ease-in-out transition transition-opacity">
        <slot name="overlay">
          <div class="text-white text-center">
            <h2 class="text-xl font-semibold">
              Card Title
            </h2>
            <p class="text-sm">
              Card Description
            </p>
          </div>
        </slot>
      </div>
    </div>
    <div :class="bottomSectionClasses" class="h-1/3 w-full p-2">
      <slot name="details" />
    </div>
  </div>
</template>

<script lang="ts" setup>

export interface Props {
  size: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), { size: 'md' })

const containerClasses = computed(() => {
  const classes = ['flex', 'flex-col', 'bg-gray-100', 'dark:bg-slate-400']
  switch (props.size) {
    case 'sm':
      classes.push('h-16', 'w-16', 'rounded-sm')
      break
    case 'md':
      classes.push('h-64', 'w-64', 'rounded-md', 'relative')
      break
    case 'lg':
      classes.push('h-96', 'w-96', 'rounded-lg', 'relative')
      break
  }

  return classes
})

const topSectionClasses = computed(() => {
  const classes = ['overflow-hidden', 'relative']
  switch (props.size) {
    case 'sm':
      classes.push('rounded-t-sm')
      break
    case 'md':
      classes.push('rounded-t-md')
      break
    case 'lg':
      classes.push('rounded-t-lg')
      break
  }

  return classes
})

const bottomSectionClasses = computed(() => {
  const classes = []
  switch (props.size) {
    case 'sm':
      classes.push()
      break
    case 'md':
      classes.push()
      break
    case 'lg':
      classes.push()
      break
  }

  return classes
})
</script>
